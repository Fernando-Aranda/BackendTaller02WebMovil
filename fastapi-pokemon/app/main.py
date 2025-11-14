from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers.pokemon_router import router as pokemon_router

app = FastAPI(title="FastAPI Pokemon API")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(pokemon_router)
