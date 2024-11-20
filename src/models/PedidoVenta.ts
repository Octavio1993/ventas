import { Cliente } from "./Cliente";
import { PedidoVentaDetalle } from "./PedidoVentaDetalle";

export class PedidoVenta {
  id: number;
  cliente: Cliente;
  fechaPedido: Date;
  nroComprobante: number;
  formaPago: string;
  observaciones?: string;
  totalPedido: number;
  detalles: PedidoVentaDetalle[];

  constructor(
    id: number,
    cliente: Cliente,
    fechaPedido: Date,
    nroComprobante: number,
    formaPago: string,
    totalPedido: number,
    detalles: PedidoVentaDetalle[], // Asegúrate de que esto sea un arreglo de detalles
    observaciones?: string
  ) {
    this.id = id;
    this.cliente = cliente;
    this.fechaPedido = fechaPedido;
    this.nroComprobante = nroComprobante;
    this.formaPago = formaPago;
    this.totalPedido = totalPedido;
    this.detalles = detalles;
    this.observaciones = observaciones;
  }

  agregarDetalle(detalle: PedidoVentaDetalle): void {
    this.detalles.push(detalle);
    detalle.pedidoVenta = this; // Sincronizar relación bidireccional
  }
}
