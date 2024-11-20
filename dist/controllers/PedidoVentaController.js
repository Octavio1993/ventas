"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PedidoVentaService_1 = __importDefault(require("../services/PedidoVentaService"));
const PedidoVenta_1 = require("../models/PedidoVenta");
const PedidoVentaDetalle_1 = require("../models/PedidoVentaDetalle");
class PedidoVentaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha, total, detalles } = req.body;
            try {
                const pedido = new PedidoVenta_1.PedidoVenta(0, new Date(fecha), total);
                detalles.forEach((detalle) => {
                    const nuevoDetalle = new PedidoVentaDetalle_1.PedidoVentaDetalle(0, detalle.cantidad, detalle.subtotal);
                    pedido.agregarDetalle(nuevoDetalle);
                });
                const id = yield PedidoVentaService_1.default.createPedido(pedido);
                res.status(201).json({ message: "Pedido creado", id });
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear pedido", error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pedido = yield PedidoVentaService_1.default.getPedidoById(Number(id));
                if (!pedido) {
                    res.status(404).json({ message: "Pedido no encontrado" });
                    return;
                }
                res.json(pedido);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener pedido", error });
            }
        });
    }
}
exports.default = new PedidoVentaController();
