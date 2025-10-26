import Nota from "../models/notaModel.js";

// Crear nota
export const crearNota = async (req, res) => {
  try {
    const { titulo, contenido, autor, categoria } = req.body;
    const nota = await Nota.create({ titulo, contenido, autor, categoria });
    res.status(201).json(nota);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todas las notas
export const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find().populate("autor", "nombre correo");
    res.json(notas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar nota
export const actualizarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const nota = await Nota.findByIdAndUpdate(id, req.body, { new: true });
    res.json(nota);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar nota
export const eliminarNota = async (req, res) => {
  try {
    const { id } = req.params;
    await Nota.findByIdAndDelete(id);
    res.json({ mensaje: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
