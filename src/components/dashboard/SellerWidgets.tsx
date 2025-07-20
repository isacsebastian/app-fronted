import { Card } from "../ui/card";

interface SellerWidgetsProps {
  totalProductos: number;
  ventasMes: number;
  productosMasVendidos: { nombre: string; vendidos: number }[];
  ultimasVentas: { id: string; cliente: string; total: number }[];
}

export function SellerWidgets({ totalProductos, ventasMes, productosMasVendidos, ultimasVentas }: SellerWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <div className="font-semibold">Mis Productos</div>
        <div className="text-3xl">{totalProductos}</div>
      </Card>
      <Card>
        <div className="font-semibold">Ventas del Mes</div>
        <div className="text-3xl">${ventasMes}</div>
      </Card>
      <div className="md:col-span-2">
        <Card>
          <div className="font-semibold mb-2">Productos más vendidos</div>
          <ul className="text-sm space-y-1">
            {productosMasVendidos.map((p, i) => (
              <li key={i}>{p.nombre} <span className="text-gray-500">({p.vendidos} vendidos)</span></li>
            ))}
          </ul>
        </Card>
      </div>
      <div>
        <Card>
          <div className="font-semibold mb-2">Últimas ventas</div>
          <ul className="text-sm space-y-1">
            {ultimasVentas.map((v) => (
              <li key={v.id}>#{v.id} - {v.cliente} <span className="text-gray-500">${v.total}</span></li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
} 