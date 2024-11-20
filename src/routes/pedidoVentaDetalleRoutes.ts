import { Router } from "express";
import PedidoVentaDetalleController from "../controllers/PedidoVentaDetalleController";

const router = Router();

// Crear un detalle para un pedido
router.post("/", PedidoVentaDetalleController.create);

export default router;
