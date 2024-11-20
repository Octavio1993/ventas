"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoVentaDetalle = void 0;
class PedidoVentaDetalle {
    constructor(id, producto, cantidad, subtotal, pedidoVenta) {
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.pedidoVenta = pedidoVenta;
        // Sincronizar las relaciones bidireccionales
        if (!producto.pedidoVentaDetalle) {
            producto.pedidoVentaDetalle = this;
        }
        if (!pedidoVenta.detalles) {
            pedidoVenta.detalles = this;
        }
    }
}
exports.PedidoVentaDetalle = PedidoVentaDetalle;
