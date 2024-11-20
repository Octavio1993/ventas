import { Request, Response } from "express";
import PedidoVentaDetalleService from "../services/PedidoVentaDetalleService";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";
import { Producto } from "../models/Producto";

class PedidoVentaDetalleController {
  async create(req: Request, res: Response): Promise<void> {
    const { idPedido, idProducto, cantidad, subtotal } = req.body;
    try {
      const detalle = new PedidoVentaDetalle(0, cantidad, subtotal);
      const producto = new Producto(idProducto, "", 0); // Cargar producto con ID
      detalle.asignarProducto(producto);

      const id = await PedidoVentaDetalleService.createDetalle(idPedido, detalle);
      res.status(201).json({ message: "Detalle creado", id });
    } catch (error) {
      res.status(500).json({ message: "Error al crear detalle", error });
    }
  }
}

export default new PedidoVentaDetalleController();
