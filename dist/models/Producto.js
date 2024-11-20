"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(id, codigoProducto, denominacion, precioVenta) {
        this.pedidoVentaDetalle = null; // Inicializar con null
        this.id = id;
        this.codigoProducto = codigoProducto;
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
    }
    asignarDetalle(detalle) {
        this.pedidoVentaDetalle = detalle;
        if (detalle.producto !== this) {
            detalle.producto = this; // Sincronizar la relación bidireccional
        }
    }
}
exports.Producto = Producto;
