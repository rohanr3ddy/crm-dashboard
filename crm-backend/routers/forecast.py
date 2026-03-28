from fastapi import APIRouter
from data_loader import load_data

router = APIRouter()

@router.get("/summary")
def forecast_summary():
    _, _, opps, _, quotas = load_data()
    open_stages = ["Qualification","Demo","Proposal","Negotiation"]
    pipeline = opps[opps["stage"].isin(open_stages)].copy()
    pipeline["weighted_arr"] = pipeline["arr_usd"] * pipeline["probability_pct"] / 100
    weighted_pipeline = pipeline["weighted_arr"].sum()
    closed_won = opps[opps["stage"] == "Closed Won"]["arr_usd"].sum()
    total_quota = quotas["quota_usd"].sum()
    forecast_total = closed_won + weighted_pipeline
    return {
        "closed_won_usd": int(closed_won),
        "weighted_pipeline_usd": int(weighted_pipeline),
        "forecast_total_usd": int(forecast_total),
        "total_quota_usd": int(total_quota),
        "attainment_pct": float(round(forecast_total / total_quota * 100, 1)) if total_quota else 0.0
    }

@router.get("/by-quarter")
def forecast_by_quarter():
    _, _, opps, _, quotas = load_data()
    won = opps[opps["stage"] == "Closed Won"].copy()
    won["quarter"] = won["close_date"].dt.to_period("Q").astype(str)
    won_q = won.groupby("quarter")["arr_usd"].sum().reset_index()
    won_q.columns = ["quarter","closed_won_usd"]
    quota_q = quotas.groupby("quarter")["quota_usd"].sum().reset_index()
    merged = quota_q.merge(won_q, on="quarter", how="left").fillna(0)
    merged["attainment_pct"] = (merged["closed_won_usd"] / merged["quota_usd"] * 100).round(1)
    return merged.sort_values("quarter").to_dict(orient="records")
