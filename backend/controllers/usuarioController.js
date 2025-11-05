import Usuario from "../models/usuarioModel.js";
import bcrypt from 'bcryptjs';

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    // Hashear la contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    const usuario = await Usuario.create({
      nombre,
      correo,
      contrasena: hash
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error });
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

// login
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrecta' });
    }

    // Comparar contraseña con hash
    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrecta' });
    }

    res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      token: 'aquí-tu-jwt-o-lo-que-usas'
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

