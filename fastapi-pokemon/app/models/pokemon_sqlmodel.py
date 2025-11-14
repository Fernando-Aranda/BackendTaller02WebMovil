from sqlmodel import SQLModel, Field
from typing import Optional


class PokemonModel(SQLModel, table=True):
    __tablename__ = "pokemon"   # <--- agregar esto

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    type: str
    level: int
