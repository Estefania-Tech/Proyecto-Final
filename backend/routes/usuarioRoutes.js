import express from "express";
import { crearUsuario, obtenerUsuarios,loginUsuario  } from "../controllers/usuarioController.js";


const router = express.Router();


router.post('/login', loginUsuario);
router.post("/", crearUsuario);
router.get("/login", obtenerUsuarios);

export default router;

