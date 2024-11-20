import { PedidoVenta } from "./PedidoVenta";

export class Cliente {
  id: number;
  cuit: string;
  razonSocial: string;
  pedidoVenta: PedidoVenta[] = []; // Relación bidireccional

  constructor(id: number, cuit: string, razonSocial: string) {
    this.id = id;
    this.cuit = cuit;
    this.razonSocial = razonSocial;
  }

  agregarPedido(pedido: PedidoVenta): void {
    this.pedidoVenta.push(pedido);
    pedido.cliente = this; // Sincronizar la relación bidireccional
  }
}