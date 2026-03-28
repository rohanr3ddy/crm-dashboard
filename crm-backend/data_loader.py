import pandas as pd
from functools import lru_cache

@lru_cache(maxsize=1)
def load_data():
    accounts   = pd.read_csv("data/accounts.csv")
    reps       = pd.read_csv("data/reps.csv")
    opps       = pd.read_csv("data/opportunities.csv")
    activities = pd.read_csv("data/activities.csv")
    quotas     = pd.read_csv("data/quotas.csv")

    opps["close_date"]   = pd.to_datetime(opps["close_date"])
    opps["created_date"] = pd.to_datetime(opps["created_date"])

    return accounts, reps, opps, activities, quotas
