"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, cuit, razonSocial) {
        this.pedidoVenta = []; // Relación bidireccional
        this.id = id;
        this.cuit = cuit;
        this.razonSocial = razonSocial;
    }
    agregarPedido(pedido) {
        this.pedidoVenta.push(pedido);
        pedido.cliente = this; // Sincronizar la relación bidireccional
    }
}
exports.Cliente = Cliente;
