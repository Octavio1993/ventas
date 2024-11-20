"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoVenta = void 0;
class PedidoVenta {
    constructor(id, cliente, fechaPedido, nroComprobante, formaPago, totalPedido, detalles, // Asegúrate de que esto sea un arreglo de detalles
    observaciones) {
        this.id = id;
        this.cliente = cliente;
        this.fechaPedido = fechaPedido;
        this.nroComprobante = nroComprobante;
        this.formaPago = formaPago;
        this.totalPedido = totalPedido;
        this.detalles = detalles;
        this.observaciones = observaciones;
    }
    agregarDetalle(detalle) {
        this.detalles.push(detalle);
        detalle.pedidoVenta = this; // Sincronizar relación bidireccional
    }
}
exports.PedidoVenta = PedidoVenta;
