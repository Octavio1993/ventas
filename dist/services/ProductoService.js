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
const Producto_1 = require("../models/Producto");
const PedidoVentaDetalle_1 = require("../models/PedidoVentaDetalle");
class ProductoService {
    createProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.query("INSERT INTO producto (codigoProducto, denominacion, precioVenta) VALUES (?, ?, ?)", [producto.codigoProducto, producto.denominacion, producto.precioVenta]);
            const id = result.insertId;
            producto.id = id;
            return id;
        });
    }
    getProductoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.default.query("SELECT * FROM producto WHERE id = ?", [id]);
            if (rows.length === 0)
                return null;
            const productoData = rows[0];
            return new Producto_1.Producto(productoData.id, productoData.codigoProducto, productoData.denominacion, productoData.precioVenta);
        });
    }
    updateProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.query("UPDATE producto SET codigoProducto = ?, denominacion = ?, precioVenta = ? WHERE id = ?", [producto.codigoProducto, producto.denominacion, producto.precioVenta, producto.id]);
        });
    }
    // Método adicional para obtener detalles de pedido
    getDetalleByPedidoId(idPedido) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.default.query("SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?", [idPedido]);
            if (rows.length === 0)
                return null;
            const detalleData = rows[0];
            // Crear instancia de PedidoVentaDetalle (y sincronizar)
            return new PedidoVentaDetalle_1.PedidoVentaDetalle(detalleData.id, detalleData.cantidad, detalleData.subtotal, detalleData.pedidoventa);
        });
    }
}
exports.default = new ProductoService();
