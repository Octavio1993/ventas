"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoController_1 = __importDefault(require("../controllers/ProductoController"));
const router = (0, express_1.Router)();
// Crear producto
router.post("/", ProductoController_1.default.create);
// Obtener producto por ID
router.get("/:id", ProductoController_1.default.getById);
// Asignar un detalle de pedido a un producto
router.post("/:idProducto/detalles", ProductoController_1.default.asignarDetalle);
exports.default = router;
