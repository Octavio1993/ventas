import { Producto } from "./Producto";
import { PedidoVenta } from "./PedidoVenta";

export class PedidoVentaDetalle {
  id: number;
  producto: Producto; // Relación bidireccional con Producto
  cantidad: number;
  subtotal: number;
  pedidoVenta: PedidoVenta; // Relación bidireccional con PedidoVenta

  constructor(
    id: number,
    producto: Producto,
    cantidad: number,
    subtotal: number,
    pedidoVenta: PedidoVenta
  ) {
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
