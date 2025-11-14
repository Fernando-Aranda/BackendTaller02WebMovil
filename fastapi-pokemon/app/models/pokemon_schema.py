from sqlmodel import SQLModel
from typing import Optional


class PokemonCreate(SQLModel):
    name: str
    type: str
    level: int


class PokemonUpdate(SQLModel):
    name: Optional[str] = None
    type: Optional[str] = None
    level: Optional[int] = None
