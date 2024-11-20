"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductoService_1 = __importDefault(require("../services/ProductoService"));
const Producto_1 = require("../models/Producto");
class ProductoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigoProducto, denominacion, precioVenta } = req.body;
            try {
                const producto = new Producto_1.Producto(0, codigoProducto, denominacion, precioVenta);
                const id = yield ProductoService_1.default.createProducto(producto);
                res.status(201).json({ message: "Producto creado", id });
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear producto", error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const producto = yield ProductoService_1.default.getProductoById(Number(id));
                if (!producto) {
                    res.status(404).json({ message: "Producto no encontrado" });
                    return;
                }
                res.json(producto);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener producto", error });
            }
        });
    }
    // Método para asignar un detalle de pedido a un producto
    asignarDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProducto } = req.params;
            const { idPedido } = req.body; // Suponiendo que idPedido es parte de la solicitud
            try {
                const producto = yield ProductoService_1.default.getProductoById(Number(idProducto));
                if (!producto) {
                    res.status(404).json({ message: "Producto no encontrado" });
                    return;
                }
                // Obtener el detalle de pedido (esto puede estar en el servicio de PedidoVentaDetalle)
                const detalle = yield ProductoService_1.default.getDetalleByPedidoId(idPedido); // Este es solo un ejemplo
                if (!detalle) {
                    res.status(404).json({ message: "Detalle no encontrado" });
                    return;
                }
                producto.asignarDetalle(detalle); // Sincronizar la relación bidireccional
                yield ProductoService_1.default.updateProducto(producto); // Guardar producto con detalle asignado
                res.status(200).json({ message: "Detalle asignado al producto" });
            }
            catch (error) {
                res.status(500).json({ message: "Error al asignar detalle", error });
            }
        });
    }
}
exports.default = new ProductoController();
