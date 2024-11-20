import pool from "../database/connection";
import { Cliente } from "../models/Cliente";
import { PedidoVenta } from "../models/PedidoVenta";

class ClienteService {
  async createCliente(cliente: Cliente): Promise<number> {
    const [result] = await pool.query(
      "INSERT INTO cliente (cuit, razonSocial) VALUES (?, ?)",
      [cliente.cuit, cliente.razonSocial]
    );
    const id = (result as any).insertId;
    cliente.id = id;
    return id;
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE id = ?", [id]);
    if (rows.length === 0) return null;

    const clienteData = rows[0];
    const cliente = new Cliente(clienteData.id, clienteData.cuit, clienteData.razonSocial);

    // Cargar pedidos asociados
    const [pedidos] = await pool.query("SELECT * FROM pedido_venta WHERE idcliente = ?", [id]);
    pedidos.forEach((pedido: any) => {
      const nuevoPedido = new PedidoVenta(pedido.id, new Date(pedido.fecha), pedido.total);
      cliente.agregarPedido(nuevoPedido); // Sincroniza relación bidireccional
    });

    return cliente;
  }

  async updateCliente(cliente: Cliente): Promise<void> {
    await pool.query(
      "UPDATE cliente SET cuit = ?, razonSocial = ? WHERE id = ?",
      [cliente.cuit, cliente.razonSocial, cliente.id]
    );
  }
}

export default new ClienteService();
