import express from "express";
import clienteRoutes from "./routes/clienteRoutes";
import pedidoVentaRoutes from "./routes/pedidoVentaRoutes";
import pedidoVentaDetalleRoutes from "./routes/pedidoVentaDetalleRoutes";
import productoRoutes from "./routes/productoRoutes";

const app = express();
app.use(express.json());

// Registrar las rutas
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoVentaRoutes);
app.use("/api/detalles", pedidoVentaDetalleRoutes);
app.use("/api/productos", productoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});