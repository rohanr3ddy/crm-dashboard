from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from routers import revenue, pipeline, reps, deals, forecast

app = FastAPI(title="CRM Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(revenue.router, prefix="/api/revenue", tags=["Revenue"])
app.include_router(pipeline.router, prefix="/api/pipeline", tags=["Pipeline"])
app.include_router(reps.router, prefix="/api/reps", tags=["Reps"])
app.include_router(deals.router, prefix="/api/deals", tags=["Deals"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["Forecast"])

@app.get("/api/download")
def download_dataset():
    return FileResponse("data/crm_dataset.zip", media_type="application/zip", filename="crm_dataset.zip")

@app.get("/")
def root():
    return {"status": "CRM Dashboard API running"}