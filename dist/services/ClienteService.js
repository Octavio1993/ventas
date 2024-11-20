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
const connection_1 = __importDefault(require("../database/connection"));
const Cliente_1 = require("../models/Cliente");
const PedidoVenta_1 = require("../models/PedidoVenta");
class ClienteService {
    createCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.default.query("INSERT INTO cliente (cuit, razonSocial) VALUES (?, ?)", [cliente.cuit, cliente.razonSocial]);
            const id = result.insertId;
            cliente.id = id;
            return id;
        });
    }
    getClienteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.default.query("SELECT * FROM cliente WHERE id = ?", [id]);
            if (rows.length === 0)
                return null;
            const clienteData = rows[0];
            const cliente = new Cliente_1.Cliente(clienteData.id, clienteData.cuit, clienteData.razonSocial);
            // Cargar pedidos asociados
            const [pedidos] = yield connection_1.default.query("SELECT * FROM pedido_venta WHERE idcliente = ?", [id]);
            pedidos.forEach((pedido) => {
                const nuevoPedido = new PedidoVenta_1.PedidoVenta(pedido.id, new Date(pedido.fecha), pedido.total);
                cliente.agregarPedido(nuevoPedido); // Sincroniza relación bidireccional
            });
            return cliente;
        });
    }
    updateCliente(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.query("UPDATE cliente SET cuit = ?, razonSocial = ? WHERE id = ?", [cliente.cuit, cliente.razonSocial, cliente.id]);
        });
    }
}
exports.default = new ClienteService();
