# fastapi-pokemon\app\routers\pokemon_router.py

# Agrega Depends a tus imports
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
# Ya no necesitas importar 'engine' aquí
from app.database import get_session # <--- Importa la función
from app.models.pokemon_sqlmodel import PokemonModel
from app.models.pokemon_schema import PokemonCreate, PokemonUpdate
from app.services.pokemon_service import (
    get_all_pokemon,
    get_pokemon_by_id,
    create_pokemon,
    update_pokemon,
    delete_pokemon,
)

router = APIRouter(prefix="/pokemons", tags=["Pokemons"])

# Inyecta la sesión con Depends
@router.get("/")
def list_pokemon(session: Session = Depends(get_session)):
    return get_all_pokemon(session)


@router.get("/{pokemon_id}")
def get_single_pokemon(pokemon_id: int, session: Session = Depends(get_session)):
    pokemon = get_pokemon_by_id(pokemon_id, session)
    if not pokemon:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return pokemon

# Agrega status_code=201 para indicar que un recurso fue creado
@router.post("/", status_code=201) 
def create_new_pokemon(data: PokemonCreate, session: Session = Depends(get_session)):
    # Pasamos el objeto 'data' directamente al servicio
    return create_pokemon(data, session)


@router.put("/{pokemon_id}")
def update_existing_pokemon(pokemon_id: int, data: PokemonUpdate, session: Session = Depends(get_session)):
    updated = update_pokemon(pokemon_id, data, session)
    if not updated:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return updated


@router.delete("/{pokemon_id}")
def delete_existing_pokemon(pokemon_id: int, session: Session = Depends(get_session)):
    deleted = delete_pokemon(pokemon_id, session)
    if not deleted:
        raise HTTPException(status_code=404, detail="Pokemon not found")
    return {"message": "Pokemon deleted successfully"}