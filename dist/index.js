"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const pedidoVentaRoutes_1 = __importDefault(require("./routes/pedidoVentaRoutes"));
const pedidoVentaDetalleRoutes_1 = __importDefault(require("./routes/pedidoVentaDetalleRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Registrar las rutas
app.use("/api/clientes", clienteRoutes_1.default);
app.use("/api/pedidos", pedidoVentaRoutes_1.default);
app.use("/api/detalles", pedidoVentaDetalleRoutes_1.default);
app.use("/api/productos", productoRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
