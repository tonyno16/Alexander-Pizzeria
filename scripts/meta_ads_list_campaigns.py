import os

from dotenv import load_dotenv
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.campaign import Campaign

load_dotenv()

access_token = os.environ["ACCESS_TOKEN"]
ad_account_id = os.environ["AD_ACCOUNT_ID"]

FacebookAdsApi.init(access_token=access_token)

account = AdAccount(f"act_{ad_account_id.lstrip('act_')}")
campaigns = list(account.get_campaigns(
    fields=[
        Campaign.Field.id,
        Campaign.Field.name,
        Campaign.Field.status,
        Campaign.Field.effective_status,
        Campaign.Field.objective,
        Campaign.Field.daily_budget,
        Campaign.Field.lifetime_budget,
    ]
))

active = [c for c in campaigns if c[Campaign.Field.effective_status] == "ACTIVE"]

print(f"Campagne totali: {len(campaigns)} - attive: {len(active)}\n")
for c in campaigns:
    budget = c.get(Campaign.Field.daily_budget) or c.get(Campaign.Field.lifetime_budget)
    budget_str = f"{int(budget) / 100:.2f} EUR" if budget else "n/d"
    print(f"[{c[Campaign.Field.effective_status]:>10}] {c[Campaign.Field.name]} "
          f"(id: {c[Campaign.Field.id]}, obiettivo: {c[Campaign.Field.objective]}, budget: {budget_str})")
