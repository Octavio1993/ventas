import { Request, Response } from "express";
import ProductoService from "../services/ProductoService";
import { Producto } from "../models/Producto";
import { PedidoVentaDetalle } from "../models/PedidoVentaDetalle";

class ProductoController {
  async create(req: Request, res: Response): Promise<void> {
    const { codigoProducto, denominacion, precioVenta } = req.body;
    try {
      const producto = new Producto(0, codigoProducto, denominacion, precioVenta);
      const id = await ProductoService.createProducto(producto);
      res.status(201).json({ message: "Producto creado", id });
    } catch (error) {
      res.status(500).json({ message: "Error al crear producto", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const producto = await ProductoService.getProductoById(Number(id));
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto", error });
    }
  }

  // Método para asignar un detalle de pedido a un producto
  async asignarDetalle(req: Request, res: Response): Promise<void> {
    const { idProducto } = req.params;
    const { idPedido } = req.body; // Suponiendo que idPedido es parte de la solicitud

    try {
      const producto = await ProductoService.getProductoById(Number(idProducto));
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }

      // Obtener el detalle de pedido (esto puede estar en el servicio de PedidoVentaDetalle)
      const detalle = await ProductoService.getDetalleByPedidoId(idPedido); // Este es solo un ejemplo
      if (!detalle) {
        res.status(404).json({ message: "Detalle no encontrado" });
        return;
      }

      producto.asignarDetalle(detalle); // Sincronizar la relación bidireccional
      await ProductoService.updateProducto(producto); // Guardar producto con detalle asignado

      res.status(200).json({ message: "Detalle asignado al producto" });
    } catch (error) {
      res.status(500).json({ message: "Error al asignar detalle", error });
    }
  }
}

export default new ProductoController();
