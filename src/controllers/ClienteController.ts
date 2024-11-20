import { Request, Response } from "express";
import ClienteService from "../services/ClienteService";
import { Cliente } from "../models/Cliente";
import { PedidoVenta } from "../models/PedidoVenta";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class ClienteController {
  async create(req: Request, res: Response): Promise<void> {
    const { cuit, razonSocial } = req.body;
    try {
      const cliente = new Cliente(0, cuit, razonSocial);
      const id = await ClienteService.createCliente(cliente);
      res.status(201).json({ message: "Cliente creado", id });
    } catch (error) {
      res.status(500).json({ message: "Error al crear cliente", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const cliente = await ClienteService.getClienteById(Number(id));
      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener cliente", error });
    }
  }

  async addPedido(req: Request, res: Response): Promise<void> {
    const { idCliente } = req.params;
    const { fecha, total, nroComprobante, formaPago, observaciones } = req.body;
    try {
      const cliente = await ClienteService.getClienteById(Number(idCliente));
      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }

      // Crear un nuevo pedido con todos los parámetros
      const pedido = new PedidoVenta(
        0,  // id: Inicializamos en 0 ya que será autoincrementado por la base de datos
        cliente,  // Cliente asociado
        new Date(fecha),  // fechaPedido
        nroComprobante,  // nroComprobante
        formaPago,  // formaPago
        total,  // totalPedido
        [] as PedidoVentaDetalle[],  // detalles: Inicializamos como un array vacío de tipo PedidoVentaDetalle
        observaciones  // observaciones: puede ser opcional, entonces lo pasamos si existe
      );

      cliente.agregarPedido(pedido);  // Agregar el pedido al cliente

      await ClienteService.updateCliente(cliente);  // Actualizar el cliente con el nuevo pedido
      res.status(200).json({ message: "Pedido agregado al cliente" });
    } catch (error) {
      res.status(500).json({ message: "Error al agregar pedido", error });
    }
  }
}

export default new ClienteController();
