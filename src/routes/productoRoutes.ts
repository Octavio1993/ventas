import { Router } from "express";
import ProductoController from "../controllers/ProductoController";

const router = Router();

// Crear producto
router.post("/", ProductoController.create);

// Obtener producto por ID
router.get("/:id", ProductoController.getById);

// Asignar un detalle de pedido a un producto
router.post("/:idProducto/detalles", ProductoController.asignarDetalle);

export default router;
