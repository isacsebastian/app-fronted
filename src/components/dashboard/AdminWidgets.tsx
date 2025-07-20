import { Card } from "../ui/card";

interface AdminWidgetsProps {
  totalUsuarios: number;
  totalPedidos: number;
  totalVentas: number;
  ultimosUsuarios: { nombre: string; email: string }[];
  ultimosPedidos: { id: string; cliente: string; total: number }[];
}

export function AdminWidgets({ totalUsuarios, totalPedidos, totalVentas, ultimosUsuarios, ultimosPedidos }: AdminWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="font-semibold">Usuarios</div>
        <div className="text-3xl">{totalUsuarios}</div>
      </Card>
      <Card>
        <div className="font-semibold">Ventas</div>
        <div className="text-3xl">${totalVentas}</div>
      </Card>
      <Card>
        <div className="font-semibold">Pedidos</div>
        <div className="text-3xl">{totalPedidos}</div>
      </Card>
      <div className="md:col-span-2">
        <Card>
          <div className="font-semibold mb-2">Últimos usuarios</div>
          <ul className="text-sm space-y-1">
            {ultimosUsuarios.map((u, i) => (
              <li key={i}>{u.nombre} <span className="text-gray-500">({u.email})</span></li>
            ))}
          </ul>
        </Card>
      </div>
      <div>
        <Card>
          <div className="font-semibold mb-2">Últimos pedidos</div>
          <ul className="text-sm space-y-1">
            {ultimosPedidos.map((p) => (
              <li key={p.id}>#{p.id} - {p.cliente} <span className="text-gray-500">${p.total}</span></li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
} 