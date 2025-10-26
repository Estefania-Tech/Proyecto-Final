import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import notasRoutes from "./routes/notasRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a base de datos
conectarDB();

// Rutas
app.get("/", (req, res) => {
  res.send("Servidor backend de Notas funcionando correctamente 🚀");

});

// Rutas de la API
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/notas", notasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
