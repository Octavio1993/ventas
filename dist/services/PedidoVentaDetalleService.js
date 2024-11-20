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
class PedidoVentaDetalleService {
    createDetalle(idPedido, detalle) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const [result] = yield connection_1.default.query("INSERT INTO pedido_venta_detalle (idpedidoventa, idproducto, cantidad, subtotal) VALUES (?, ?, ?, ?)", [idPedido, (_a = detalle.producto) === null || _a === void 0 ? void 0 : _a.id, detalle.cantidad, detalle.subtotal]);
            const id = result.insertId;
            detalle.id = id;
            return id;
        });
    }
}
exports.default = new PedidoVentaDetalleService();
