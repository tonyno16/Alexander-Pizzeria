(function () {
  "use strict";

  // Schema.org JSON-LD generator for Alexander Pizzeria
  // This script generates structured data based on the current page

  var LOCATIONS = {
    pinerolo: {
      name: "Alexander Pinerolo",
      id: "https://www.alexanderpizzeria.com/pinerolo/#restaurant",
      url: "https://www.alexanderpizzeria.com/pinerolo/",
      telephone: "+390121332035",
      servesCuisine: ["Pizza", "Italian"],
      priceRange: "$$",
      address: {
        streetAddress: "Via Achille Midana, 37",
        addressLocality: "Pinerolo",
        addressRegion: "TO",
        postalCode: "10064",
        addressCountry: "IT",
      },
      geo: { latitude: 44.883, longitude: 7.33 },
      openingHours: [
        {
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "18:30",
          closes: "23:30",
        },
      ],
      menu: "https://wwknhl80hqwournhivn1dmt9rf08ppvc.menu.pienissimo.pro/?id=111",
    },
    piossasco: {
      name: "Alexander Piossasco",
      id: "https://www.alexanderpizzeria.com/piossasco/#restaurant",
      url: "https://www.alexanderpizzeria.com/piossasco/",
      telephone: "+390117601733",
      servesCuisine: ["Pizza", "Italian"],
      priceRange: "$$",
      address: {
        streetAddress: "Via Pinerolo, 149",
        addressLocality: "Piossasco",
        addressRegion: "TO",
        postalCode: "10045",
        addressCountry: "IT",
      },
      geo: { latitude: 44.984, longitude: 7.465 },
      openingHours: [
        {
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "18:30",
          closes: "23:30",
        },
      ],
      menu: "https://5s9dcuw9c2pz665jbv4g4qvmyvjlogfh.menu.pienissimo.pro/?id=10",
    },
    giaveno: {
      name: "Alexander Valsangone - Pizzeria e Ristorante",
      id: "https://www.alexanderpizzeria.com/giaveno/#restaurant",
      url: "https://www.alexanderpizzeria.com/giaveno/",
      telephone: "+390119376286",
      servesCuisine: [
        "Pizza",
        "Italian",
        "Porcini Mushroom Dishes",
        "Funghi Porcini",
      ],
      priceRange: "$$",
      address: {
        streetAddress: "Piazza Molines, 45",
        addressLocality: "Giaveno",
        addressRegion: "TO",
        postalCode: "10094",
        addressCountry: "IT",
      },
      geo: { latitude: 45.042, longitude: 7.353 },
      openingHours: [
        {
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "12:00",
          closes: "15:00",
        },
        {
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "18:30",
          closes: "23:30",
        },
      ],
      menu: "https://4ajacb1xf2rpvydbkjcepog7qvryk252.menu.pienissimo.pro/?id=142",
    },
    rivoli: {
      name: "Alexander Rivoli - Pizzeria e Ristorante",
      id: "https://www.alexanderpizzeria.com/rivoli/#restaurant",
      url: "https://www.alexanderpizzeria.com/rivoli/",
      telephone: "+390110608880",
      servesCuisine: ["Pizza", "Italian"],
      priceRange: "$$",
      address: {
        streetAddress: "Piazza Principe Eugenio, 7",
        addressLocality: "Rivoli",
        addressRegion: "TO",
        postalCode: "10098",
        addressCountry: "IT",
      },
      geo: { latitude: 45.072, longitude: 7.513 },
      openingHours: [
        {
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "18:30",
          closes: "23:30",
        },
      ],
      menu: "https://b6u0iddgee4zqtmlqiwjqza4isqefigr.menu.pienissimo.pro/?id=175",
    },
  };

  function generateRestaurantSchema(locationKey) {
    var loc = LOCATIONS[locationKey];
    if (!loc) return null;

    var hours = loc.openingHours.map(function (h) {
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      };
    });

    return {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": loc.id,
      name: loc.name,
      url: loc.url,
      telephone: loc.telephone,
      servesCuisine: loc.servesCuisine,
      priceRange: loc.priceRange,
      acceptsReservations: "True",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.streetAddress,
        addressLocality: loc.address.addressLocality,
        addressRegion: loc.address.addressRegion,
        postalCode: loc.address.postalCode,
        addressCountry: loc.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.latitude,
        longitude: loc.geo.longitude,
      },
      openingHoursSpecification: hours,
      menu: loc.menu,
      parentOrganization: {
        "@id": "https://www.alexanderpizzeria.com/#organization",
      },
    };
  }

  function generateBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map(function (item, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        };
      }),
    };
  }

  var BREADCRUMB_BASE = "https://www.alexanderpizzeria.com";
  var BREADCRUMB_NAMES = {
    pinerolo: "Pinerolo",
    piossasco: "Piossasco",
    giaveno: "Giaveno (Valsangone)",
    rivoli: "Rivoli",
  };

  function injectSchema(schemaData) {
    if (!schemaData) return;
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
  }

  // Le pagine sede hanno già JSON-LD completo nel HTML.
  // Non iniettare un secondo Restaurant: gli orari e i campi divergerebbero.

  // Export for manual use
  window.AlexanderSchema = {
    generateRestaurantSchema: generateRestaurantSchema,
    generateBreadcrumbSchema: generateBreadcrumbSchema,
    injectSchema: injectSchema,
    locations: LOCATIONS,
  };

  if (!document.querySelector('script[type="application/ld+json"]') || document.documentElement.innerHTML.indexOf("#organization") === -1) {
    injectSchema({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://www.alexanderpizzeria.com/#organization",
      name: "Alexander Pizzeria",
      legalName: "Alexander S.R.L.",
      url: "https://www.alexanderpizzeria.com/",
      foundingDate: "2009",
      telephone: "+390117601733",
      vatID: "IT10021390017",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Toscanini 15",
        addressLocality: "Piossasco",
        postalCode: "10045",
        addressRegion: "TO",
        addressCountry: "IT",
      },
      sameAs: [
        "https://www.instagram.com/alexanderpizzeria_/",
        "https://www.facebook.com/alexanderpizzeria/",
      ],
      subOrganization: [
        { "@id": "https://www.alexanderpizzeria.com/piossasco/#restaurant" },
        { "@id": "https://www.alexanderpizzeria.com/pinerolo/#restaurant" },
        { "@id": "https://www.alexanderpizzeria.com/giaveno/#restaurant" },
        { "@id": "https://www.alexanderpizzeria.com/rivoli/#restaurant" },
      ],
    });
  }
})();
