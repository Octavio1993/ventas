import pool from "../database/connection";
import { Producto } from "../models/Producto";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class ProductoService {
  async createProducto(producto: Producto): Promise<number> {
    const [result] = await pool.query(
      "INSERT INTO producto (codigoProducto, denominacion, precioVenta) VALUES (?, ?, ?)",
      [producto.codigoProducto, producto.denominacion, producto.precioVenta]
    );
    const id = (result as any).insertId;
    producto.id = id;
    return id;
  }

  async getProductoById(id: number): Promise<Producto | null> {
    const [rows] = await pool.query("SELECT * FROM producto WHERE id = ?", [id]);
    if (rows.length === 0) return null;

    const productoData = rows[0];
    return new Producto(productoData.id, productoData.codigoProducto, productoData.denominacion, productoData.precioVenta);
  }

  async updateProducto(producto: Producto): Promise<void> {
    await pool.query(
      "UPDATE producto SET codigoProducto = ?, denominacion = ?, precioVenta = ? WHERE id = ?",
      [producto.codigoProducto, producto.denominacion, producto.precioVenta, producto.id]
    );
  }

  // Método adicional para obtener detalles de pedido
  async getDetalleByPedidoId(idPedido: number): Promise<PedidoVentaDetalle | null> {
    const [rows] = await pool.query("SELECT * FROM pedido_venta_detalle WHERE idpedidoventa = ?", [idPedido]);
    if (rows.length === 0) return null;

    const detalleData = rows[0];
    // Crear instancia de PedidoVentaDetalle (y sincronizar)
    return new PedidoVentaDetalle(detalleData.id, detalleData.cantidad, detalleData.subtotal, detalleData.pedidoventa);
  }
}

export default new ProductoService();
