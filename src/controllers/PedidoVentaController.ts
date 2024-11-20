import { Request, Response } from "express";
import PedidoVentaService from "../services/PedidoVentaService";
import { PedidoVenta } from "../models/PedidoVenta";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class PedidoVentaController {
  async create(req: Request, res: Response): Promise<void> {
    const { fecha, total, detalles } = req.body;
    try {
      const pedido = new PedidoVenta(0, new Date(fecha), total);

      detalles.forEach((detalle: any) => {
        const nuevoDetalle = new PedidoVentaDetalle(0, detalle.cantidad, detalle.subtotal);
        pedido.agregarDetalle(nuevoDetalle);
      });

      const id = await PedidoVentaService.createPedido(pedido);
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
