import { useUserStore } from "../stores/userStore";
import { AdminWidgets } from "../components/dashboard/AdminWidgets";
import { SellerWidgets } from "../components/dashboard/SellerWidgets";
import { CustomerWidgets } from "../components/dashboard/CustomerWidgets";
import React from "react";
import { useEffect, useState } from "react";
import { apiClient } from "../lib/utils";
import { FreelancerWidgets } from "../components/dashboard/FreelancerWidgets";
import type { User } from "../types/user";

function useAdminDashboardData() {
  const [loading, setLoading] = useState(true);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [ultimosUsuarios, setUltimosUsuarios] = useState<{ nombre: string; email: string }[]>([]);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [ultimosPedidos, setUltimosPedidos] = useState<{ id: string; cliente: string; total: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Usuarios reales
        const users = await apiClient.getUsers();
        setTotalUsuarios(users.length);
        setUltimosUsuarios(users.slice(-5).reverse().map(u => ({ nombre: u.profile ? `${u.profile.firstName} ${u.profile.lastName}` : u.email, email: u.email })));
        // Pedidos y ventas (simulado)
        setTotalPedidos(12);
        setTotalVentas(3400);
        setUltimosPedidos([
          { id: "1", cliente: "Juan Pérez", total: 120 },
          { id: "2", cliente: "Ana López", total: 80 },
        ]);
      } catch (e) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, totalUsuarios, totalPedidos, totalVentas, ultimosUsuarios, ultimosPedidos };
}

function useSellerDashboardData() {
  const [loading, setLoading] = useState(true);
  const [totalProductos, setTotalProductos] = useState(0);
  const [ventasMes, setVentasMes] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState<{ nombre: string; vendidos: number }[]>([]);
  const [ultimasVentas, setUltimasVentas] = useState<{ id: string; cliente: string; total: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Productos y ventas (simulado)
        setTotalProductos(8);
        setVentasMes(1200);
        setProductosMasVendidos([
          { nombre: "Producto A", vendidos: 30 },
          { nombre: "Producto B", vendidos: 20 },
        ]);
        setUltimasVentas([
          { id: "1", cliente: "Carlos Ruiz", total: 200 },
          { id: "2", cliente: "María Gómez", total: 150 },
        ]);
      } catch (e) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, totalProductos, ventasMes, productosMasVendidos, ultimasVentas };
}

function useCustomerDashboardData() {
  const [loading, setLoading] = useState(true);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalRecomendaciones, setTotalRecomendaciones] = useState(0);
  const [ultimosPedidos, setUltimosPedidos] = useState<{ id: string; total: number; fecha: string }[]>([]);
  const [ultimasRecomendaciones, setUltimasRecomendaciones] = useState<{ id: string; texto: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Pedidos y recomendaciones (simulado)
        setTotalPedidos(5);
        setTotalRecomendaciones(3);
        setUltimosPedidos([
          { id: "1", total: 50, fecha: "2024-07-20" },
          { id: "2", total: 80, fecha: "2024-07-18" },
        ]);
        setUltimasRecomendaciones([
          { id: "1", texto: "¡Te recomendamos el producto X!" },
          { id: "2", texto: "Basado en tus compras, prueba Y." },
        ]);
      } catch (e) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, totalPedidos, totalRecomendaciones, ultimosPedidos, ultimasRecomendaciones };
}

function useFreelancerDashboardData(user: User | null) {
  // Simular los datos de referralCodes según el seeder
  const referralCodes = user?.email === "freelancer@lupa.com"
    ? [
        {
          code: "WELCOME10",
          description: "10% de descuento para nuevos clientes",
          discountType: "PERCENTAGE",
          discountValue: 10,
          maxUses: 100,
        },
      ]
    : [];
  return {
    name: (user?.profile?.firstName || "") + ' ' + (user?.profile?.lastName || ""),
    email: user?.email || "",
    phone: user?.profile?.phone || "",
    referralCodes,
  };
}

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const name = user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : "Usuario";

  // Admin dashboard data
  const adminData = useAdminDashboardData();
  const sellerData = useSellerDashboardData();
  const customerData = useCustomerDashboardData();
  const freelancerData = useFreelancerDashboardData(user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {name}</h1>
      {user?.role === "ADMIN" && (
        <AdminWidgets
          totalUsuarios={adminData.totalUsuarios}
          totalPedidos={adminData.totalPedidos}
          totalVentas={adminData.totalVentas}
          ultimosUsuarios={adminData.ultimosUsuarios}
          ultimosPedidos={adminData.ultimosPedidos}
        />
      )}
      {user?.role === "SELLER" && (
        <SellerWidgets
          totalProductos={sellerData.totalProductos}
          ventasMes={sellerData.ventasMes}
          productosMasVendidos={sellerData.productosMasVendidos}
          ultimasVentas={sellerData.ultimasVentas}
        />
      )}
      {user?.role === "CUSTOMER" && (
        <CustomerWidgets
          totalPedidos={customerData.totalPedidos}
          totalRecomendaciones={customerData.totalRecomendaciones}
          ultimosPedidos={customerData.ultimosPedidos}
          ultimasRecomendaciones={customerData.ultimasRecomendaciones}
        />
      )}
      {user?.role === "FREELANCER" && (
        <FreelancerWidgets
          referralCodes={freelancerData.referralCodes}
        />
      )}
      {/* Agrega más roles según lo necesites */}
    </div>
  );
}
