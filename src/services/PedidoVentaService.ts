import pool from "../database/connection";
import { PedidoVenta } from "../models/PedidoVenta";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class PedidoVentaService {
  async createPedido(pedido: PedidoVenta): Promise<number> {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO pedido_venta (fecha, total, idcliente) VALUES (?, ?, ?)",
        [pedido.fecha, pedido.total, pedido.cliente?.id]
      );
      const id = (result as any).insertId;
      pedido.id = id;

      for (const detalle of pedido.detalles) {
        await connection.query(
          "INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
          [id, detalle.producto?.id, detalle.cantidad, detalle.subtotal]
        );
      }

      await connection.commit();
      return id;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getPedidoById(id: number): Promise<PedidoVenta | null> {
    const [rows] = await pool.query("SELECT * FROM pedido_venta WHERE id = ?", [id]);
    if (rows.length === 0) return null;

    const pedidoData = rows[0];
    const pedido = new PedidoVenta(pedidoData.id, new Date(pedidoData.fecha), pedidoData.total);

    // Cargar detalles asociados
    const [detalles] = await pool.query("SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?", [id]);
    detalles.forEach((detalle: any) => {
      const nuevoDetalle = new PedidoVentaDetalle(detalle.id, detalle.cantidad, detalle.subtotal);
      pedido.agregarDetalle(nuevoDetalle);
    });

    return pedido;
  }
}

export default new PedidoVentaService();
