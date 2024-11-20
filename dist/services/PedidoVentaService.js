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
const connection_1 = __importDefault(require("../database/connection"));
const PedidoVenta_1 = require("../models/PedidoVenta");
const PedidoVentaDetalle_1 = require("../models/PedidoVentaDetalle");
class PedidoVentaService {
    createPedido(pedido) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const connection = yield connection_1.default.getConnection();
            try {
                yield connection.beginTransaction();
                const [result] = yield connection.query("INSERT INTO pedido_venta (fecha, total, idcliente) VALUES (?, ?, ?)", [pedido.fecha, pedido.total, (_a = pedido.cliente) === null || _a === void 0 ? void 0 : _a.id]);
                const id = result.insertId;
                pedido.id = id;
                for (const detalle of pedido.detalles) {
                    yield connection.query("INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)", [id, (_b = detalle.producto) === null || _b === void 0 ? void 0 : _b.id, detalle.cantidad, detalle.subtotal]);
                }
                yield connection.commit();
                return id;
            }
            catch (error) {
                yield connection.rollback();
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    getPedidoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.default.query("SELECT * FROM pedido_venta WHERE id = ?", [id]);
            if (rows.length === 0)
                return null;
            const pedidoData = rows[0];
            const pedido = new PedidoVenta_1.PedidoVenta(pedidoData.id, new Date(pedidoData.fecha), pedidoData.total);
            // Cargar detalles asociados
            const [detalles] = yield connection_1.default.query("SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?", [id]);
            detalles.forEach((detalle) => {
                const nuevoDetalle = new PedidoVentaDetalle_1.PedidoVentaDetalle(detalle.id, detalle.cantidad, detalle.subtotal);
                pedido.agregarDetalle(nuevoDetalle);
            });
            return pedido;
        });
    }
}
exports.default = new PedidoVentaService();
