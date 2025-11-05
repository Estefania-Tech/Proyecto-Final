import Usuario from "../models/usuarioModel.js";

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }
   
    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: contrasenaHash
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
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
      return res.status(400).json({ mensaje: "Correo no registrado" });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      },
      token: "fake-jwt-token-" + usuario._id
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

