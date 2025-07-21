import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const categories = [
  "Plásticos",
  "Eléctricos",
  "Cocina",
  "Repostería",
];

const HomeHeader = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Barra principal */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/">
          <img src="/LOGO-LUPA-1.webp" alt="Lupa Logo" className="h-14 cursor-pointer" />
        </Link>
        {/* Buscador */}
        <div className="flex flex-1 mx-6 max-w-xl">
          <select className="rounded-l px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none">
            <option>Categorías</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="¿Qué producto estás buscando?"
            className="flex-1 px-3 py-2 border-t border-b border-gray-300 bg-gray-100 text-gray-700 focus:outline-none"
          />
          <button className="rounded-r px-3 py-2 bg-gray-200 border border-gray-300 hover:bg-gray-300">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
        </div>
        {/* Íconos */}
        <div className="flex items-center gap-6 text-2xl text-gray-600">
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setUserMenuOpen((v) => !v)} className="focus:outline-none">
              <img src="/icons/account.svg" alt="Usuario" className="h-7 w-7" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50 border border-gray-200">
                {!isAuthenticated ? (
                  <>
                    <button
                      className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-gray-700 text-sm"
                      onClick={() => { setUserMenuOpen(false); navigate('/login'); }}
                    >
                      Iniciar sesión
                    </button>
                    <button
                      className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-gray-700 text-sm"
                      onClick={() => { setUserMenuOpen(false); navigate('/register'); }}
                    >
                      Registrarse
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-gray-700 text-sm"
                      onClick={() => { setUserMenuOpen(false); navigate('/profile'); }}
                    >
                      Ver perfil
                    </button>
                    <button
                      className="w-full text-left px-4 py-1.5 hover:bg-gray-100 text-gray-700 text-sm"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <img src="/icons/shooping-car.svg" alt="Carrito" className="h-7 w-7" />
          <img src="/icons/reminder.svg" alt="Notificaciones" className="h-7 w-7" />
          <img src="/icons/location.svg" alt="Ubicación" className="h-7 w-7" />
        </div>
      </div>
      {/* Menú de categorías */}
      <div className="w-full border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center gap-6 py-3 px-4">
          <button
            className="bg-[#FE9124] hover:bg-orange-600 text-white font-semibold rounded-[8px] flex items-center gap-3 text-base transition px-4"
            style={{ width: 256, height: 34 }}
          >
            <span className="text-lg">☰</span>
            <span>Comprar por Categoría</span>
          </button>
          {categories.map((cat) => (
            <div key={cat} className="relative group flex items-center gap-1">
              <button className="text-gray-700 font-medium hover:text-orange-500 transition flex items-center gap-1">{cat} <img src="/icons/arrow.svg" alt="flecha" className="inline-block w-3 h-3" /></button>
              {/* Aquí puedes agregar un dropdown si lo necesitas */}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HomeHeader; 