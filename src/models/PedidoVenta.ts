import { Cliente } from "./Cliente";
import { PedidoVentaDetalle } from "./PedidoVentaDetalle";

export class PedidoVenta {
  id: number;
  cliente: Cliente; // Relación bidireccional con Cliente
  fechaPedido: Date;
  nroComprobante: number;
  formaPago: string;
  observaciones?: string;
  totalPedido: number;
  detalles: PedidoVentaDetalle[]; // Relación bidireccional con PedidoVentaDetalle

  constructor(
    id: number,
    cliente: Cliente,
    fechaPedido: Date,
    nroComprobante: number,
    formaPago: string,
    totalPedido: number,
    detalles: PedidoVentaDetalle[],
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

  asignarCliente(cliente: Cliente): void {
    this.cliente = cliente;
    if (!cliente.pedidoVenta.includes(this)) {
      cliente.agregarPedido(this); // Sincronizar la relación bidireccional
    }
  }
}
