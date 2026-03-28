from fastapi import APIRouter
from data_loader import load_data

router = APIRouter()

@router.get("/leaderboard")
def rep_leaderboard():
    _, reps, opps, _, quotas = load_data()
    won = opps[opps["stage"] == "Closed Won"]
    rep_rev = won.groupby("rep_id").agg(
        closed_deals=("opp_id","count"),
        total_arr=("arr_usd","sum")
    ).reset_index()

    closed = opps[opps["stage"].isin(["Closed Won","Closed Lost"])]
    win_rates = closed.groupby("rep_id").apply(
        lambda x: round(len(x[x["stage"]=="Closed Won"]) / len(x) * 100, 1)
    ).reset_index()
    win_rates.columns = ["rep_id","win_rate_pct"]

    quota_total = quotas.groupby("rep_id")["quota_usd"].sum().reset_index()
    attained_total = quotas.groupby("rep_id")["attained_usd"].sum().reset_index()

    result = reps[["rep_id","name","team","region"]].merge(rep_rev, on="rep_id", how="left")
    result = result.merge(win_rates, on="rep_id", how="left")
    result = result.merge(quota_total, on="rep_id", how="left")
    result = result.merge(attained_total, on="rep_id", how="left")
    result["quota_attainment_pct"] = (result["attained_usd"] / result["quota_usd"] * 100).round(1)
    result = result.fillna(0).sort_values("total_arr", ascending=False)
    return result.to_dict(orient="records")

@router.get("/quota-by-quarter")
def quota_by_quarter():
    _, reps, _, _, quotas = load_data()
    merged = quotas.merge(reps[["rep_id","name"]], on="rep_id", how="left")
    return merged.to_dict(orient="records")
