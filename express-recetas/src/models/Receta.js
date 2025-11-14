import mongoose from "mongoose";

const RecetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  ingredientes: { type: [String], default: [] },
  instrucciones: { type: String, required: true },
  imagen: { type: String }, // opcional
}, { timestamps: true });

export default mongoose.model("Receta", RecetaSchema);
