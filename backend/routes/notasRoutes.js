import express from "express";
import { crearNota, obtenerNotas, actualizarNota, eliminarNota } from "../controllers/notaController.js";

const router = express.Router();

router.post("/", crearNota);
router.get("/", obtenerNotas);
router.put("/:id", actualizarNota);
router.delete("/:id", eliminarNota);

export default router;

/* import express from 'express';
const router = express.Router();

// Ruta temporal de prueba
router.get('/', (req, res) => {
  res.send('Ruta de notas funcionando correctamente');
});

export default router;
 */