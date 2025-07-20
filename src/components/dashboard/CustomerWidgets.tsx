import { Card } from "../ui/card";

interface CustomerWidgetsProps {
  totalPedidos: number;
  totalRecomendaciones: number;
  ultimosPedidos: { id: string; total: number; fecha: string }[];
  ultimasRecomendaciones: { id: string; texto: string }[];
}

export function CustomerWidgets({ totalPedidos, totalRecomendaciones, ultimosPedidos, ultimasRecomendaciones }: CustomerWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <div className="font-semibold">Mis Pedidos</div>
        <div className="text-3xl">{totalPedidos}</div>
      </Card>
      <Card>
        <div className="font-semibold">Recomendaciones</div>
        <div className="text-3xl">{totalRecomendaciones}</div>
      </Card>
      <div className="md:col-span-2">
        <Card>
          <div className="font-semibold mb-2">Últimos pedidos</div>
          <ul className="text-sm space-y-1">
            {ultimosPedidos.map((p) => (
              <li key={p.id}>#{p.id} - ${p.total} <span className="text-gray-500">{p.fecha}</span></li>
            ))}
          </ul>
        </Card>
      </div>
      <div>
        <Card>
          <div className="font-semibold mb-2">Últimas recomendaciones</div>
          <ul className="text-sm space-y-1">
            {ultimasRecomendaciones.map((r) => (
              <li key={r.id}>{r.texto}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
} 