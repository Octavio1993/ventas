import { PedidoVentaDetalle } from "./PedidoVentaDetalle";

export class Producto {
  id: number;
  codigoProducto: string;
  denominacion: string;
  precioVenta: number;
  pedidoVentaDetalle: PedidoVentaDetalle | null = null; // Inicializar con null

  constructor(
    id: number,
    codigoProducto: string,
    denominacion: string,
    precioVenta: number
  ) {
    this.id = id;
    this.codigoProducto = codigoProducto;
    this.denominacion = denominacion;
    this.precioVenta = precioVenta;
  }

  asignarDetalle(detalle: PedidoVentaDetalle): void {
    this.pedidoVentaDetalle = detalle;
    if (detalle.producto !== this) {
      detalle.producto = this; // Sincronizar la relación bidireccional
    }
  }
}
