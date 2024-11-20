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
const ClienteService_1 = __importDefault(require("../services/ClienteService"));
const Cliente_1 = require("../models/Cliente");
const PedidoVenta_1 = require("../models/PedidoVenta");
class ClienteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cuit, razonSocial } = req.body;
            try {
                const cliente = new Cliente_1.Cliente(0, cuit, razonSocial);
                const id = yield ClienteService_1.default.createCliente(cliente);
                res.status(201).json({ message: "Cliente creado", id });
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear cliente", error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cliente = yield ClienteService_1.default.getClienteById(Number(id));
                if (!cliente) {
                    res.status(404).json({ message: "Cliente no encontrado" });
                    return;
                }
                res.json(cliente);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener cliente", error });
            }
        });
    }
    addPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCliente } = req.params;
            const { fecha, total, nroComprobante, formaPago, observaciones } = req.body;
            try {
                const cliente = yield ClienteService_1.default.getClienteById(Number(idCliente));
                if (!cliente) {
                    res.status(404).json({ message: "Cliente no encontrado" });
                    return;
                }
                // Crear un nuevo pedido con todos los parámetros
                const pedido = new PedidoVenta_1.PedidoVenta(0, // id: Inicializamos en 0 ya que será autoincrementado por la base de datos
                cliente, // Cliente asociado
                new Date(fecha), // fechaPedido
                nroComprobante, // nroComprobante
                formaPago, // formaPago
                total, // totalPedido
                [], // detalles: Inicializamos como un array vacío de tipo PedidoVentaDetalle
                observaciones // observaciones: puede ser opcional, entonces lo pasamos si existe
                );
                cliente.agregarPedido(pedido); // Agregar el pedido al cliente
                yield ClienteService_1.default.updateCliente(cliente); // Actualizar el cliente con el nuevo pedido
                res.status(200).json({ message: "Pedido agregado al cliente" });
            }
            catch (error) {
                res.status(500).json({ message: "Error al agregar pedido", error });
            }
        });
    }
}
exports.default = new ClienteController();
