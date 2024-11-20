import pool from "../database/connection";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class PedidoVentaDetalleService {
  async createDetalle(idPedido: number, detalle: PedidoVentaDetalle): Promise<number> {
    const [result] = await pool.query(
      "INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
      [idPedido, detalle.producto?.id, detalle.cantidad, detalle.subtotal]
    );
    const id = (result as any).insertId;
    detalle.id = id;
    return id;
  }
}

export default new PedidoVentaDetalleService();
