import { Router } from "express";
import PedidoVentaController from "../controllers/PedidoVentaController";

const router = Router();

// Crear un pedido
router.post("/", PedidoVentaController.create);

// Obtener un pedido por ID
router.get("/:id", PedidoVentaController.getById);

export default router;
