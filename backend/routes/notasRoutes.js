import express from "express";
import { crearNota, obtenerNotas, actualizarNota, eliminarNota } from "../controllers/notaController.js";

const router = express.Router();

router.post("/", crearNota);
router.get("/", obtenerNotas);
router.put("/:id", actualizarNota);
router.delete("/:id", eliminarNota);

export default router;
