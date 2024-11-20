"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PedidoVentaDetalleController_1 = __importDefault(require("../controllers/PedidoVentaDetalleController"));
const router = (0, express_1.Router)();
// Crear un detalle para un pedido
router.post("/", PedidoVentaDetalleController_1.default.create);
exports.default = router;
