import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { Home, User, LogOut } from "lucide-react";

export function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/profile", label: "Perfil", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col py-6 px-4 shadow-sm">
      {/* Avatar y nombre */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
        </div>
        <div>
          <div className="font-semibold">{user?.profile?.firstName} {user?.profile?.lastName}</div>
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>
      </div>
      {/* Navegación */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
              location.pathname === item.to
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors mt-8"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </nav>
      {/* Footer opcional */}
      <div className="mt-8 text-xs text-gray-300 text-center">© 2024 Lupa</div>
    </aside>
  );
}
