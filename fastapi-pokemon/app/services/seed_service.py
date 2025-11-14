from sqlmodel import Session
from app.models.pokemon_sqlmodel import PokemonModel


def seed_data(session: Session):
    initial_data = [
        PokemonModel(name="Pikachu", type="Electric", level=10),
        PokemonModel(name="Charmander", type="Fire", level=8),
        PokemonModel(name="Squirtle", type="Water", level=7),
    ]

    for pokemon in initial_data:
        session.add(pokemon)

    session.commit()
    return {"message": "Seed completed", "count": len(initial_data)}
