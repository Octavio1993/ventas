"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClienteController_1 = __importDefault(require("../controllers/ClienteController"));
const router = (0, express_1.Router)();
// Crear cliente
router.post("/", ClienteController_1.default.create);
// Obtener cliente por ID
router.get("/:id", ClienteController_1.default.getById);
// Agregar un pedido al cliente
router.post("/:idCliente/pedidos", ClienteController_1.default.addPedido);
exports.default = router;
