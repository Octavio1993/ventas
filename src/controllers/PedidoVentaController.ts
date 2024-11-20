import { Request, Response } from "express";
import PedidoVentaService from "../services/PedidoVentaService";
import { PedidoVenta } from "../models/PedidoVenta";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";
import ClienteService from "../services/ClienteService";  // Asegúrate de importar el servicio de Cliente

class PedidoVentaController {
  async create(req: Request, res: Response): Promise<void> {
    const { fecha, total, nroComprobante, formaPago, observaciones, detalles } = req.body;
    try {
      // Convertir el parámetro idCliente a número
      const clienteId = Number(req.params.idCliente);

      // Verificar si el ID de cliente es válido
      if (isNaN(clienteId)) {
        res.status(400).json({ message: "ID de cliente inválido" });
        return;
      }

      // Obtener el cliente usando el ID convertido
      const cliente = await ClienteService.getClienteById(clienteId);

      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }

      // Crear el pedido con todos los parámetros necesarios
      const pedido = new PedidoVenta(
        0,  // id: Inicializamos en 0 ya que será autoincrementado por la base de datos
        cliente,  // Cliente asociado
        new Date(fecha),  // fechaPedido
        nroComprobante,  // nroComprobante
        formaPago,  // formaPago
        total,  // totalPedido
        [],  // Inicializamos detalles como un arreglo vacío
        observaciones  // observaciones: puede ser opcional
      );

      // Agregar detalles al pedido
      detalles.forEach((detalle: any) => {
        const nuevoDetalle = new PedidoVentaDetalle(0, detalle.producto, detalle.cantidad, detalle.subtotal, pedido); // Crear nuevo detalle
        pedido.agregarDetalle(nuevoDetalle);  // Agregar el detalle al pedido
      });

      const id = await PedidoVentaService.createPedido(pedido);  // Llamar al servicio para crear el pedido
      res.status(201).json({ message: "Pedido creado", id });
    } catch (error) {
      res.status(500).json({ message: "Error al crear pedido", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const pedido = await PedidoVentaService.getPedidoById(Number(id));
      if (!pedido) {
        res.status(404).json({ message: "Pedido no encontrado" });
        return;
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener pedido", error });
    }
  }
}

export default new PedidoVentaController();
