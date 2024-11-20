"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoVenta = void 0;
class PedidoVenta {
    constructor(id, cliente, fechaPedido, nroComprobante, formaPago, totalPedido, detalles, observaciones) {
        this.id = id;
        this.cliente = cliente;
        this.fechaPedido = fechaPedido;
        this.nroComprobante = nroComprobante;
        this.formaPago = formaPago;
        this.totalPedido = totalPedido;
        this.detalles = detalles;
        this.observaciones = observaciones;
    }
    asignarCliente(cliente) {
        this.cliente = cliente;
        if (!cliente.pedidoVenta.includes(this)) {
            cliente.agregarPedido(this); // Sincronizar la relación bidireccional
        }
    }
}
exports.PedidoVenta = PedidoVenta;
