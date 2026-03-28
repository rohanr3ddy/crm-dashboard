from fastapi import APIRouter
from data_loader import load_data

router = APIRouter()

@router.get("/summary")
def revenue_summary():
    _, reps, opps, _, quotas = load_data()
    won = opps[opps["stage"] == "Closed Won"]
    total_quota = quotas["quota_usd"].sum()
    total_won = won["arr_usd"].sum()
    return {
        "total_arr_usd": int(total_won),
        "total_closed_deals": int(len(won)),
        "avg_deal_size_usd": int(won["arr_usd"].mean()),
        "avg_sales_cycle_days": float(round(won["sales_cycle_days"].mean(), 1)),
        "closed_won_attainment_pct": float(round(total_won / total_quota * 100, 1)) if total_quota else 0.0
    }

@router.get("/over-time")
def revenue_over_time():
    _, _, opps, _, _ = load_data()
    won = opps[opps["stage"] == "Closed Won"].copy()
    won["month"] = won["close_date"].dt.to_period("M").astype(str)
    monthly = won.groupby("month")["arr_usd"].sum().reset_index()
    monthly.columns = ["month", "arr_usd"]
    return monthly.sort_values("month").to_dict(orient="records")

@router.get("/by-segment")
def revenue_by_segment():
    accounts, _, opps, _, _ = load_data()
    won = opps[opps["stage"] == "Closed Won"]
    merged = won.merge(accounts[["account_id","segment"]], on="account_id", how="left")
    result = merged.groupby("segment")["arr_usd"].sum().reset_index()
    return result.to_dict(orient="records")

@router.get("/by-industry")
def revenue_by_industry():
    accounts, _, opps, _, _ = load_data()
    won = opps[opps["stage"] == "Closed Won"]
    merged = won.merge(accounts[["account_id","industry"]], on="account_id", how="left")
    result = merged.groupby("industry")["arr_usd"].sum().reset_index()
    return result.sort_values("arr_usd", ascending=False).to_dict(orient="records")
