# fastapi-pokemon\app\database.py

from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./pokemon.db"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Esta función será nuestro "Dependency"
def get_session():
    with Session(engine) as session:
        yield session