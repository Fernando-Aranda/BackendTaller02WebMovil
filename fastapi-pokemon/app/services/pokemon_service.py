# fastapi-pokemon\app\services\pokemon_service.py

from sqlmodel import Session, select
from app.models.pokemon_sqlmodel import PokemonModel
# Importa los schemas que vas a recibir del router
from app.models.pokemon_schema import PokemonCreate, PokemonUpdate


def get_all_pokemon(session: Session):
    return session.exec(select(PokemonModel)).all()


def get_pokemon_by_id(pokemon_id: int, session: Session):
    return session.get(PokemonModel, pokemon_id)


# La función ahora recibe el schema PokemonCreate
def create_pokemon(pokemon_data: PokemonCreate, session: Session):
    # Creamos la instancia del modelo de BD a partir del schema
    pokemon = PokemonModel.from_orm(pokemon_data)
    session.add(pokemon)
    session.commit()
    session.refresh(pokemon)
    return pokemon


# La función ahora recibe el schema PokemonUpdate
def update_pokemon(pokemon_id: int, pokemon_data: PokemonUpdate, session: Session):
    pokemon = session.get(PokemonModel, pokemon_id)
    if not pokemon:
        return None

    # .dict(exclude_unset=True) es clave para solo actualizar los campos que vienen en el JSON
    update_data = pokemon_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(pokemon, key, value)

    session.add(pokemon)
    session.commit()
    session.refresh(pokemon)
    return pokemon


def delete_pokemon(pokemon_id: int, session: Session):
    pokemon = session.get(PokemonModel, pokemon_id)
    if not pokemon:
        return False

    session.delete(pokemon)
    session.commit()
    return True