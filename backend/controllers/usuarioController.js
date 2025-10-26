import Usuario from "../models/usuarioModel.js";

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = await Usuario.create({ nombre, correo, contraseña, rol });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
