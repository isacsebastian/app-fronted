const categories = [
  { name: 'Cajoneras', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg' },
  { name: 'Armarios', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg' },
  { name: 'Cajoneras', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg' },
  { name: 'Armarios', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg' },
]

const CategoryGrid = () => (
  <section className="w-full max-w-6xl mx-auto pt-6 pb-12 px-4">
    <div className="mb-2">
      <div className="font-semibold text-lg" style={{ color: '#FE9124' }}>Nuestras Categorías</div>
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 leading-tight mb-6">Comprar por Categoría</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-full flex items-center justify-center mb-2">
            <div style={{ width: 331, height: 338, background: '#EEEEEE', borderRadius: 10 }} className="flex items-center justify-center overflow-hidden">
              <img src={cat.img} alt={cat.name} className="object-contain h-full" onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
          </div>
          <div className="font-bold text-lg text-blue-600 mb-2 mt-2 text-center">{cat.name}</div>
          <button className="px-5 py-2 text-white rounded font-semibold mt-1" style={{ backgroundColor: '#FE9124' }}>Comprar ahora</button>
        </div>
      ))}
    </div>
  </section>
)

export default CategoryGrid 