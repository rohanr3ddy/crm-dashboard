from fastapi import APIRouter
from data_loader import load_data

router = APIRouter()

STAGE_ORDER = ["Prospecting","Qualification","Demo","Proposal","Negotiation","Closed Won","Closed Lost"]

@router.get("/funnel")
def pipeline_funnel():
    _, _, opps, _, _ = load_data()
    result = opps.groupby("stage").agg(
        count=("opp_id","count"),
        total_arr=("arr_usd","sum")
    ).reset_index()
    result["stage_order"] = result["stage"].apply(lambda s: STAGE_ORDER.index(s) if s in STAGE_ORDER else 99)
    result = result.sort_values("stage_order").drop(columns="stage_order")
    return result.to_dict(orient="records")

@router.get("/by-source")
def pipeline_by_source():
    _, _, opps, _, _ = load_data()
    result = opps.groupby("source").agg(
        count=("opp_id","count"),
        total_arr=("arr_usd","sum")
    ).reset_index()
    return result.to_dict(orient="records")

@router.get("/win-loss")
def win_loss():
    _, _, opps, _, _ = load_data()
    won  = len(opps[opps["stage"] == "Closed Won"])
    lost = len(opps[opps["stage"] == "Closed Lost"])
    total = won + lost
    return {
        "won": won,
        "lost": lost,
        "win_rate_pct": round(won / total * 100, 1) if total else 0
    }

@router.get("/lost-reasons")
def lost_reasons():
    _, _, opps, _, _ = load_data()
    lost = opps[opps["stage"] == "Closed Lost"]
    result = lost["lost_reason"].value_counts().reset_index()
    result.columns = ["reason", "count"]
    return result.to_dict(orient="records")
