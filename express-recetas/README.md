
# Express Recetas API

Una API REST para gestionar recetas usando **Express** y **MongoDB (Mongoose)**. Permite crear, listar, actualizar y eliminar recetas de cocina.

---

## 📁 Estructura del proyecto

```
express-recetas/
├─ src/
│  ├─ app.js                  # Configuración de Express y rutas
│  ├─ server.js               # Punto de entrada del servidor
│  ├─ config/
│  │  └─ db.js                # Conexión a MongoDB
│  ├─ controllers/
│  │  └─ recetas.controller.js # Lógica de negocio de las recetas
│  ├─ models/
│  │  └─ Receta.js            # Modelo Mongoose de Receta
│  └─ routes/
│     └─ recetas.routes.js    # Rutas de la API
├─ .env                        # Variables de entorno (no subir al repo)
├─ Dockerfile
├─ package.json
└─ README.md
```

---

## ⚙️ Requisitos

* Node.js 18+
* npm
* MongoDB

Instalar dependencias:

```bash
npm install
```

Configura tu `.env` con:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/recetasdb
```

> Puedes crear un `.env.example` para que tu equipo lo copie y modifique.

---

## 🚀 Levantar la API

**Local:**

```bash
npm run dev
```

Servidor Express activo en: `http://localhost:4000`
Rutas de recetas: `http://localhost:4000/api/recetas`

**Con Docker:**

```bash
docker build -t express-recetas .
docker run -p 4000:4000 --env-file .env express-recetas
```

---

## 📌 Endpoints

| Método | Ruta               | Descripción                     |
| ------ | ------------------ | ------------------------------- |
| GET    | `/api/recetas/`    | Listar todas las recetas        |
| GET    | `/api/recetas/:id` | Obtener una receta por ID       |
| POST   | `/api/recetas/`    | Crear una nueva receta          |
| PUT    | `/api/recetas/:id` | Actualizar una receta existente |
| DELETE | `/api/recetas/:id` | Eliminar una receta por ID      |

---

## 📝 Ejemplo de POST

**URL:** `http://localhost:4000/api/recetas/`
**Método:** POST
**Body (JSON):**

```json
{
    "nombre": "Tacos al Pastor",
    "categoria": "Comida Mexicana",
    "ingredientes": [
        "Carne de cerdo",
        "Achiote",
        "Piña",
        "Cilantro",
        "Cebolla"
    ],
    "instrucciones": "Marinar la carne, cocinarla en el trompo, cortar y servir en tortillas con piña, cilantro y cebolla."
}
```

**Respuesta esperada:**

```json
{
    "_id": "64f3b8c6a2d3b4c1f0e9a123",
    "nombre": "Tacos al Pastor",
    "categoria": "Comida Mexicana",
    "ingredientes": [
        "Carne de cerdo",
        "Achiote",
        "Piña",
        "Cilantro",
        "Cebolla"
    ],
    "instrucciones": "Marinar la carne, cocinarla en el trompo, cortar y servir en tortillas con piña, cilantro y cebolla.",
    "createdAt": "2025-11-14T12:00:00.000Z",
    "updatedAt": "2025-11-14T12:00:00.000Z",
    "__v": 0
}
```

---

## 💡 Notas

1. MongoDB debe estar corriendo y accesible según `MONGO_URI`.
2. Se recomienda usar **Postman** para probar los endpoints.
3. Las rutas usan `express.json()` para procesar JSON automáticamente.
