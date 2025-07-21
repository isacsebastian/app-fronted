const ExploreCatalog = () => (
  <section className="w-full max-w-6xl mx-auto pt-6 pb-12 px-4">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      {/* Imagen o placeholder */}
      <div className="flex-1 w-full h-64 bg-gray-200 rounded-xl min-w-[260px]" />
      {/* Texto y botón */}
      <div className="flex-1 flex flex-col items-start gap-4 min-w-[260px]">
        <div className="font-semibold text-lg" style={{ color: '#FE9124' }}>Explora más Opciones</div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 leading-tight">Todo para tu hogar</h2>
        <p className="text-gray-500">Encuentra productos funcionales y accesibles para tu hogar o negocio. Ya sea que estés buscando organizar tu espacio, encontrar proveedores cercanos o empezar a vender, en nuestro catálogo hay algo para ti.</p>
        <button className="mt-2 px-8 py-2 text-white rounded font-semibold" style={{ backgroundColor: '#FE9124' }}>Ver Catálogo</button>
      </div>
    </div>
  </section>
)

export default ExploreCatalog 