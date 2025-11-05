import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario"
  }
}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
