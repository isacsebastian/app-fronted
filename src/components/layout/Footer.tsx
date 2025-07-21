const Footer = () => (
  <footer className="w-full bg-blue-600 text-white pt-10 pb-4 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
      {/* Logo y suscripción */}
      <div className="flex-1 min-w-[220px] flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <img src="/LOGO-LUPA-1.webp" alt="Lupa Logo" className="h-10 w-auto" />
        </div>
        <div className="text-base font-medium">Regístrate y obtén un 10% de descuento en tu primera compra.</div>
        <form className="flex flex-col gap-2 max-w-xs">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="rounded-lg px-5 py-2 bg-[#1762F4] border border-white text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition"
            style={{ borderWidth: 1 }}
          />
          <button
            type="submit"
            className="bg-white text-[#1762F4] font-semibold rounded-full px-6 py-2 transition hover:opacity-80 focus:outline-none shadow-sm"
            style={{ border: 'none' }}
          >
            Suscribirse
          </button>
        </form>
      </div>
      {/* Categorías */}
      <div className="flex-1 min-w-[160px] flex flex-col gap-2 md:items-center">
        <div className="font-bold text-lg mb-2">Categorías</div>
        <a href="/" className="hover:underline">Home</a>
        <a href="/products" className="hover:underline">Productos</a>
        <a href="/about" className="hover:underline">Sobre nosotros</a>
      </div>
      {/* Contacto */}
      <div className="flex-1 min-w-[180px] flex flex-col gap-2 md:items-center border-l border-white/30 pl-4">
        <div className="font-bold text-lg mb-2">Contáctanos</div>
        <div>lupa@hotmail.com</div>
        <div>Cuenca-Ecuador</div>
        <div>+593-543-2345</div>
      </div>
      {/* Redes Sociales */}
      <div className="flex-1 min-w-[140px] flex flex-col gap-2 md:items-center border-l border-white/30 pl-4">
        <div className="font-bold text-lg mb-2">Redes Sociales</div>
        <div className="flex gap-3 text-xl">
          <a href="#" aria-label="Facebook" className="hover:text-blue-200"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-200"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" aria-label="Instagram" className="hover:text-blue-200"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-200"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <div>@lupaec</div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 border-t border-white/30 pt-4 text-center text-xs opacity-80">
      © 2025 Lupa.ec. Todos los derechos reservados. Los productos y servicios ofrecidos en este sitio web están sujetos a los términos y condiciones especificados en las políticas de la empresa.
    </div>
  </footer>
)

export default Footer
