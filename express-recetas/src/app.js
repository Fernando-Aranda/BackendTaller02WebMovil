import express from "express";
import cors from "cors";
import recetasRoutes from "./routes/recetas.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/recetas", recetasRoutes);

export default app;
