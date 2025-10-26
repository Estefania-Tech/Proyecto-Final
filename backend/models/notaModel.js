import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  contenido: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  categoria: {
    type: String,
    default: "General"
  },
  estado: {
    type: String,
    enum: ["activo", "archivado"],
    default: "activo"
  }
}, { timestamps: true });

const Nota = mongoose.model("Nota", notaSchema);

export default Nota;
