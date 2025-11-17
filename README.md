# Intro. Web Móvil - Grupo 5

## Número de grupo
**Grupo 5**

## Integrantes
- Bryan Carvajal - 21.177.361-8  
- David Pino - 21.274.006-3
- Javier Pizarro - 21.213.249-7
- Fernando Aranda - 20.007.253-7

# Proyecto Multi-DB con Docker Compose

Este proyecto integra **tres APIs** diferentes, cada una con su propia base de datos, levantadas de manera conjunta mediante **Docker Compose**:

1. **Express Recetas** → Base de datos: MongoDB
2. **FastAPI Pokemon** → Base de datos: SQLite
3. **NestJS Users (BD de anime)** → Base de datos: PostgreSQL

Con esto, se pueden probar y desarrollar todas las APIs de forma aislada o conjunta, sin necesidad de instalar bases de datos locales manualmente.

---

## 📁 Estructura del proyecto

```
proyecto-raiz/
├─ docker-compose.yml        # Configuración de los servicios y bases de datos
├─ express-recetas/          # API de recetas (MongoDB)
├─ fastapi-pokemon/          # API de Pokemons (SQLite)
├─ nestjs-users/             # API de anime (PostgreSQL)
├─ README.md
└─ ...
```

---

## ⚙️ Requisitos

* Docker
* Docker Compose

---

## 🚀 Levantar todos los servicios

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará:

| Servicio        | Base de datos     | Puerto |
| --------------- | ----------------- | ------ |
| **PostgreSQL**  | `nestjs-users`    | 5432   |
| **MongoDB**     | `express-recetas` | 27017  |
| **Express API** | `express-recetas` | 4000   |

> FastAPI Pokemon usa **SQLite** y se levanta desde su propio contenedor o entorno local según configuración.

---

## 📝 Detalles de los servicios

### 1. **PostgreSQL + NestJS Users**

* Base de datos: `infomovil`
* Usuario: `info`
* Contraseña: `info_pass`
* Puerto expuesto: `5432`
* Contenedor: `postgres:15`
* API: `nestjs-users` (Gestión de usuarios/anime)

### 2. **MongoDB + Express Recetas**

* Base de datos: `recetasdb` (configurable vía `.env`)
* Puerto expuesto: `27017`
* Contenedor: `mongo:6`
* API: `express-recetas` (Gestión de recetas)
* Endpoint principal: `http://localhost:4000/api/recetas`

### 3. **FastAPI Pokemon**

* Base de datos: SQLite (`pokemon.db`)
* API: `fastapi-pokemon`
* Puerto: `8000` (configurable en `app/main.py`)
* Endpoints: `/pokemons/`

---

## 🔧 Volúmenes persistentes

Docker Compose crea volúmenes para que los datos no se pierdan al reiniciar los contenedores:

* `pgdata` → Datos de PostgreSQL
* `mongodata` → Datos de MongoDB

---

## 💡 Buenas prácticas

1. Crear archivos `.env` o usar `.env.example` en cada API para no subir credenciales al repositorio.
2. Usar `docker-compose down -v` si quieres eliminar contenedores y volúmenes y empezar desde cero.
3. Cada API puede desarrollarse localmente y conectarse a su base de datos respectiva, o levantarse junto con Docker Compose para integración completa.
