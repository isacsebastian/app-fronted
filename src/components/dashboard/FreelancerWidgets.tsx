import { Card } from "../ui/card";

interface ReferralCode {
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
}

interface FreelancerWidgetsProps {
  referralCodes: ReferralCode[];
}

export function FreelancerWidgets({ referralCodes }: FreelancerWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <div className="font-semibold mb-2">Códigos de Referido</div>
        {referralCodes.length === 0 ? (
          <div className="text-gray-500 text-sm">No tienes códigos de referido.</div>
        ) : (
          <ul className="text-sm space-y-2">
            {referralCodes.map((r) => (
              <li key={r.code} className="border-b pb-2 last:border-b-0">
                <div><span className="font-medium">Código:</span> {r.code}</div>
                <div><span className="font-medium">Descripción:</span> {r.description}</div>
                <div><span className="font-medium">Máx. usos:</span> {r.maxUses}</div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
} 