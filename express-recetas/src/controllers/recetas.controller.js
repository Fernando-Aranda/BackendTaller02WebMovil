import Receta from "../models/Receta.js";

export const getRecetas = async (req, res) => {
  const recetas = await Receta.find();
  res.json(recetas);
};

export const createReceta = async (req, res) => {
  try {
    const receta = new Receta(req.body);
    await receta.save();
    res.json(receta);
  } catch (err) {
    res.status(500).json({ error: "Error al crear receta" });
  }
};

export const getReceta = async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada" });
    }
    res.json(receta);
  } catch (err) {
    // Para manejar IDs con formato inválido
    res.status(500).json({ error: "Error al obtener la receta" });
  }
};

export const deleteReceta = async (req, res) => {
  try {
    const receta = await Receta.findByIdAndDelete(req.params.id);
    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada para eliminar" });
    }
    res.json({ msg: "Receta eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la receta" });
  }
};

export const updateReceta = async (req, res) => {
  try {
    const receta = await Receta.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado
    });
    if (!receta) {
      return res.status(404).json({ msg: "Receta no encontrada para actualizar" });
    }
    res.json(receta);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la receta" });
  }
};