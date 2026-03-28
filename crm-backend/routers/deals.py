from fastapi import APIRouter
from data_loader import load_data
import pandas as pd

router = APIRouter()

@router.get("/aging")
def deal_aging():
    accounts, reps, opps, _, _ = load_data()
    open_stages = ["Prospecting","Qualification","Demo","Proposal","Negotiation"]
    open_deals = opps[opps["stage"].isin(open_stages)].copy()
    today = pd.Timestamp("2025-12-31")
    open_deals["days_open"] = (today - open_deals["created_date"]).dt.days
    open_deals = open_deals.sort_values("days_open", ascending=False)
    merged = open_deals.merge(accounts[["account_id","company_name"]], on="account_id", how="left")
    merged = merged.merge(reps[["rep_id","name"]], on="rep_id", how="left")
    cols = ["opp_id","company_name","name","stage","arr_usd","days_open","close_date"]
    return merged[cols].head(50).to_dict(orient="records")