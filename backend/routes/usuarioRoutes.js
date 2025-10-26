import express from "express";
import { crearUsuario, obtenerUsuarios } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", crearUsuario);
router.get("/", obtenerUsuarios);

export default router;
