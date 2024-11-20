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
const PedidoVentaDetalleService_1 = __importDefault(require("../services/PedidoVentaDetalleService"));
const PedidoVentaDetalle_1 = require("../models/PedidoVentaDetalle");
const Producto_1 = require("../models/Producto");
class PedidoVentaDetalleController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido, idProducto, cantidad, subtotal } = req.body;
            try {
                const detalle = new PedidoVentaDetalle_1.PedidoVentaDetalle(0, cantidad, subtotal);
                const producto = new Producto_1.Producto(idProducto, "", 0); // Cargar producto con ID
                detalle.asignarProducto(producto);
                const id = yield PedidoVentaDetalleService_1.default.createDetalle(idPedido, detalle);
                res.status(201).json({ message: "Detalle creado", id });
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear detalle", error });
            }
        });
    }
}
exports.default = new PedidoVentaDetalleController();
