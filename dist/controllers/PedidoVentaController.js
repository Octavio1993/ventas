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
const PedidoVentaService_1 = __importDefault(require("../services/PedidoVentaService"));
const PedidoVenta_1 = require("../models/PedidoVenta");
const PedidoVentaDetalle_1 = require("../models/PedidoVentaDetalle");
const ClienteService_1 = __importDefault(require("../services/ClienteService")); // Asegúrate de importar el servicio de Cliente
class PedidoVentaController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const cliente = yield ClienteService_1.default.getClienteById(clienteId);
                if (!cliente) {
                    res.status(404).json({ message: "Cliente no encontrado" });
                    return;
                }
                // Crear el pedido con todos los parámetros necesarios
                const pedido = new PedidoVenta_1.PedidoVenta(0, // id: Inicializamos en 0 ya que será autoincrementado por la base de datos
                cliente, // Cliente asociado
                new Date(fecha), // fechaPedido
                nroComprobante, // nroComprobante
                formaPago, // formaPago
                total, // totalPedido
                [], // Inicializamos detalles como un arreglo vacío
                observaciones // observaciones: puede ser opcional
                );
                // Agregar detalles al pedido
                detalles.forEach((detalle) => {
                    const nuevoDetalle = new PedidoVentaDetalle_1.PedidoVentaDetalle(0, detalle.producto, detalle.cantidad, detalle.subtotal, pedido); // Crear nuevo detalle
                    pedido.agregarDetalle(nuevoDetalle); // Agregar el detalle al pedido
                });
                const id = yield PedidoVentaService_1.default.createPedido(pedido); // Llamar al servicio para crear el pedido
                res.status(201).json({ message: "Pedido creado", id });
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear pedido", error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const pedido = yield PedidoVentaService_1.default.getPedidoById(Number(id));
                if (!pedido) {
                    res.status(404).json({ message: "Pedido no encontrado" });
                    return;
                }
                res.json(pedido);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener pedido", error });
            }
        });
    }
}
exports.default = new PedidoVentaController();
