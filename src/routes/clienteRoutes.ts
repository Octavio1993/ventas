import { Router } from "express";
import ClienteController from "../controllers/ClienteController";

const router = Router();

// Crear cliente
router.post("/", ClienteController.create);

// Obtener cliente por ID
router.get("/:id", ClienteController.getById);

// Agregar un pedido al cliente
router.post("/:idCliente/pedidos", ClienteController.addPedido);

export default router;
