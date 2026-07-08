import os

from dotenv import load_dotenv
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adsinsights import AdsInsights

load_dotenv()

access_token = os.environ["ACCESS_TOKEN"]
ad_account_id = os.environ["AD_ACCOUNT_ID"]

FacebookAdsApi.init(access_token=access_token)

account = AdAccount(f"act_{ad_account_id.lstrip('act_')}")

insights = list(account.get_insights(
    fields=[
        AdsInsights.Field.campaign_name,
        AdsInsights.Field.spend,
        AdsInsights.Field.impressions,
        AdsInsights.Field.reach,
        AdsInsights.Field.clicks,
        AdsInsights.Field.ctr,
        AdsInsights.Field.cpc,
        AdsInsights.Field.cpm,
        AdsInsights.Field.frequency,
    ],
    params={
        "level": "campaign",
        "date_preset": "last_30d",
        "filtering": [{"field": "campaign.effective_status", "operator": "IN", "value": ["ACTIVE"]}],
    },
))

if not insights:
    print("Nessun dato di insights negli ultimi 30 giorni per le campagne attive.")
else:
    print(f"Performance ultimi 30 giorni ({len(insights)} campagne)\n")
    for i in insights:
        print(f"Campagna: {i.get(AdsInsights.Field.campaign_name)}")
        print(f"  Spesa:        {i.get(AdsInsights.Field.spend, '0')} EUR")
        print(f"  Impression:   {i.get(AdsInsights.Field.impressions, '0')}")
        print(f"  Copertura:    {i.get(AdsInsights.Field.reach, '0')}")
        print(f"  Click:        {i.get(AdsInsights.Field.clicks, '0')}")
        print(f"  CTR:          {i.get(AdsInsights.Field.ctr, '0')}%")
        print(f"  CPC:          {i.get(AdsInsights.Field.cpc, 'n/d')} EUR")
        print(f"  CPM:          {i.get(AdsInsights.Field.cpm, 'n/d')} EUR")
        print(f"  Frequenza:    {i.get(AdsInsights.Field.frequency, 'n/d')}")
        print()
