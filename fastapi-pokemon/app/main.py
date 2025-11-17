# app/main.py

from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers.pokemon_router import router as pokemon_router
from fastapi.middleware.cors import CORSMiddleware  # <-- 1. Importar

app = FastAPI(title="FastAPI Pokemon API")

# --- 2. AÑADIR ESTE BLOQUE DE CÓDIGO ---
# Define de dónde puede venir tu frontend
origins = [
    "http://127.0.0.1:5500", # Si usas Live Server en VS Code
    "http://localhost:5500",
    "null" # Necesario para permitir 'file://' (abrir el HTML directamente)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Orígenes que pueden hacer peticiones
    allow_credentials=True,
    allow_methods=["*"],         # Todos los métodos (GET, POST, etc.)
    allow_headers=["*"],         # Todos los headers
)
# --- FIN DEL BLOQUE ---


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(pokemon_router)