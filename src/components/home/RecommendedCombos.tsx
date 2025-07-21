const combos = [
  { name: 'Súper Combo', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 190, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', tag: 'Más Vendido' },
  { name: 'Combo Máster', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 150, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', tag: 'Más Económico' },
  { name: 'Súper Combo', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 190, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', tag: 'Más Vendido' },
  { name: 'Combo Máster', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 190, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', tag: 'Más Vendido' },
]

const RecommendedCombos = () => (
  <section className="w-full max-w-6xl mx-auto pt-6 pb-12 px-4">
    <div className="mb-2">
      <div className="font-semibold text-lg" style={{ color: '#FE9124' }}>Nuestros Combos</div>
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 leading-tight mb-6">Combos Recomendados</h2>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-2">
      {combos.map((combo, i) => (
        <div key={i} className="flex flex-col items-center min-w-[250px]">
          <div className="w-full flex items-center justify-center mb-2 relative">
            <div style={{ width: 331, height: 338, background: '#EEEEEE', borderRadius: 10 }} className="flex items-center justify-center overflow-hidden">
              <img src={combo.img} alt={combo.name} className="object-contain h-full" onError={e => (e.currentTarget.style.display = 'none')} />
              {combo.tag && <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{combo.tag}</span>}
            </div>
          </div>
          <button className="w-full px-4 py-2 text-white rounded mb-2" style={{ backgroundColor: '#FE9124' }}>Ver más</button>
          <div className="font-bold text-lg text-blue-600 mb-1">{combo.name}</div>
          <div className="text-gray-500 text-sm mb-1 text-center">{combo.desc}</div>
          <div className="text-[#FE9124] font-bold text-lg">${combo.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  </section>
)

export default RecommendedCombos 