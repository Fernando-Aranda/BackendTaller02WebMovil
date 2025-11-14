# FastAPI Pokemon API

Una API REST para gestionar Pokemons usando **FastAPI** y **SQLModel** (SQLite). Permite crear, listar, actualizar y eliminar Pokemons.

---

# Correr Servidor

```
python -m uvicorn app.main:app --reload
```

## 📁 Estructura del proyecto

```
fastapi-pokemon/
├─ app/
│  ├─ database.py          # Configuración de SQLite y sesión
│  ├─ main.py              # Punto de entrada de FastAPI
│  ├─ models/
│  │  ├─ pokemon_schema.py # Schemas Pydantic/SQLModel para validación
│  │  └─ pokemon_sqlmodel.py # Modelo SQLModel para la BD
│  ├─ routers/
│  │  └─ pokemon_router.py # Endpoints de la API
│  └─ services/
│     ├─ pokemon_service.py # Lógica de negocio CRUD
│     └─ seed_service.py    # Datos de ejemplo para inicializar
├─ pokemon.db               # Base de datos SQLite (generada automáticamente)
├─ requirements.txt
└─ README.md
```

---

## ⚙️ Requisitos

* Python 3.10+
* pip
* FastAPI
* SQLModel
* Uvicorn (para correr el servidor)

Instalar dependencias:

```bash
pip install fastapi uvicorn sqlmodel
```

---

## 🚀 Levantar la API

Desde la raíz del proyecto:

```bash
uvicorn app.main:app --reload
```

* Servidor activo en `http://127.0.0.1:8000`
* Documentación automática en Swagger: `http://127.0.0.1:8000/docs`
* Redoc: `http://127.0.0.1:8000/redoc`

---

## 📌 Endpoints

Todos los endpoints se encuentran bajo `/pokemons`.

| Método | Ruta             | Descripción                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/pokemons/`     | Listar todos los Pokemons       |
| GET    | `/pokemons/{id}` | Obtener un Pokemon por ID       |
| POST   | `/pokemons/`     | Crear un nuevo Pokemon          |
| PUT    | `/pokemons/{id}` | Actualizar un Pokemon existente |
| DELETE | `/pokemons/{id}` | Eliminar un Pokemon             |

---

## 📝 Ejemplo de POST

Crear un nuevo Pokemon:

**URL:** `http://127.0.0.1:8000/pokemons/`
**Método:** POST
**Body (JSON):**

```json
{
  "name": "Bulbasaur",
  "type": "Grass",
  "level": 5
}
```

**Respuesta esperada:**

```json
{
  "id": 1,
  "name": "Bulbasaur",
  "type": "Grass",
  "level": 5
}
```

---

## 💾 Semilla de datos

Puedes inicializar algunos Pokemons de ejemplo usando el `seed_service.py` en la sesión de SQLModel:

```python
from app.database import get_session
from app.services.seed_service import seed_data

with next(get_session()) as session:
    seed_data(session)
```

Esto agregará:

* Pikachu (Electric, level 10)
* Charmander (Fire, level 8)
* Squirtle (Water, level 7)

---

## 📌 Notas

1. La base de datos SQLite (`pokemon.db`) se genera automáticamente al iniciar la API.
2. SQLModel maneja tanto la validación como la interacción con la base de datos.
3. Las rutas están documentadas automáticamente en `/docs`.

---

Si quieres, puedo hacer una **versión extendida del README con ejemplo de Docker** para levantar la API junto a la base de datos automáticamente, lista para que tu grupo solo haga `docker-compose up`. Esto sería ideal si tu proyecto crece y quieres compartirlo tal cual sin instalar Python.

¿Quieres que haga esa versión con Docker incluida?
