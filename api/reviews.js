/**
 * Voto e numero di recensioni Google delle 4 sedi.
 * Una lettura al giorno: la risposta resta in cache 24 ore.
 * Richiede GOOGLE_PLACES_API_KEY (Places API New) nelle variabili Vercel.
 */
const PLACES = [
  {
    id: "pinerolo",
    textQuery: "Alexander Pizzeria Via Achille Midana 37 Pinerolo",
    latitude: 44.8850792,
    longitude: 7.3417378,
    accept: (name) => /alexander/i.test(name),
  },
  {
    id: "piossasco",
    textQuery: "Alexander Pizzeria Via Pinerolo 149 Piossasco",
    latitude: 44.985337,
    longitude: 7.459942,
    accept: (name) => /alexander/i.test(name),
  },
  {
    id: "giaveno",
    textQuery: "Ristorante Valsangone Piazza Molines 45 Giaveno",
    latitude: 45.0422549,
    longitude: 7.3510435,
    accept: (name) => /valsangone|alexander/i.test(name),
  },
  {
    id: "rivoli",
    textQuery: "Alexander Rivoli Piazza Principe Eugenio 7",
    latitude: 45.0688943,
    longitude: 7.5210696,
    accept: (name) => /alexander/i.test(name),
  },
];

async function lookupReviews(fetchImpl, key) {
  const locations = {};
  await Promise.all(
    PLACES.map(async (place) => {
      const response = await fetchImpl(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": key,
            "X-Goog-FieldMask":
              "places.displayName,places.rating,places.userRatingCount,places.reviews",
          },
          body: JSON.stringify({
            textQuery: place.textQuery,
            languageCode: "it",
            regionCode: "IT",
            pageSize: 1,
            locationBias: {
              circle: {
                center: {
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
                radius: 400,
              },
            },
          }),
        }
      );
      if (!response.ok) return;
      const payload = await response.json();
      const found = payload.places && payload.places[0];
      if (!found) return;
      const name = (found.displayName && found.displayName.text) || "";
      const rating = Number(found.rating);
      const count = Number(found.userRatingCount);
      if (!place.accept(name)) return;
      if (!Number.isFinite(rating) || !Number.isFinite(count) || count < 1) return;
      locations[place.id] = {
        name,
        rating: Math.round(rating * 10) / 10,
        count: Math.round(count),
        quotes: positiveQuotes(found.reviews),
      };
    })
  );
  return locations;
}

function positiveQuotes(reviews) {
  if (!Array.isArray(reviews)) return [];
  return reviews
    .map((review) => {
      const text = review.text && review.text.text ? String(review.text.text).trim() : "";
      const author = review.authorAttribution || {};
      const stars = Number(review.rating);
      if (!text || !author.displayName || !Number.isFinite(stars) || stars < 4) return null;
      return {
        text,
        rating: stars,
        author: String(author.displayName),
        authorUri: httpsUrl(author.uri),
        when: review.relativePublishTimeDescription || "",
        mapsUri: httpsUrl(review.googleMapsUri),
      };
    })
    .filter(Boolean);
}

function httpsUrl(value) {
  return typeof value === "string" && value.startsWith("https://") ? value : "";
}

const DAY_MS = 24 * 60 * 60 * 1000;
let memoryCache = null;

function cacheHeaders(res) {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader(
    "Vercel-CDN-Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=86400"
  );
}

module.exports = async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ live: false, locations: {} });
    return;
  }

  if (memoryCache && Date.now() - memoryCache.savedAt < DAY_MS) {
    cacheHeaders(res);
    res.status(200).json(memoryCache.body);
    return;
  }

  try {
    const locations = await lookupReviews(fetch, key);
    const live = Object.keys(locations).length > 0;
    if (!live) {
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ live: false, locations: {} });
      return;
    }
    const body = {
      live: true,
      updatedAt: new Date().toISOString(),
      locations,
    };
    memoryCache = { savedAt: Date.now(), body };
    cacheHeaders(res);
    res.status(200).json(body);
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ live: false, locations: {} });
  }
};

module.exports.lookupReviews = lookupReviews;
module.exports.positiveQuotes = positiveQuotes;
