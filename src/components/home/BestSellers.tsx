const bestSellers = [
  { name: 'Súper Combo', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 190, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', rating: 5, favorite: true },
  { name: 'Combo Máster', img: '/icons/productos/CAJONERA SUPREMA DUO 5N BEIGE-1.svg', price: 190, desc: 'Descripción pequeña del combo que podría ser relevante para la venta', rating: 5, favorite: true },
]

const BestSellers = () => (
  <section className="w-full max-w-6xl mx-auto pt-6 pb-12 px-4">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Columna izquierda: descripción */}
      <div className="flex-1 min-w-[260px]">
        <div className="font-semibold text-lg mb-1" style={{ color: '#FE9124' }}>Alta Calidad</div>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 leading-tight mb-4">Productos más Vendidos</h2>
        <p className="text-gray-500 mb-6">Mantén tu hogar ordenado y funcional con nuestros productos más populares. Desde cajoneras resistentes hasta cestas prácticas y closets compactos, nuestra colección ha sido pensada para ayudarte a aprovechar cada rincón de tu espacio, sin gastar de más.</p>
        <button className="px-8 py-2 text-white rounded font-semibold" style={{ backgroundColor: '#FE9124' }}>Ver todos</button>
      </div>
      {/* Columna derecha: productos */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {bestSellers.map((prod, i) => (
          <div key={i} className="flex flex-col items-center relative">
            {/* Badge favorito */}
            {prod.favorite && (
              <span className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
              </span>
            )}
            <div className="w-full flex items-center justify-center mb-2">
              <div style={{ width: 331, height: 338, background: '#EEEEEE', borderRadius: 10 }} className="flex items-center justify-center overflow-hidden">
                <img src={prod.img} alt={prod.name} className="object-contain h-full" onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
            </div>
            <div className="font-bold text-lg text-blue-600 mb-1 mt-2 text-center">{prod.name}</div>
            <div className="text-gray-500 text-sm mb-1 text-center">{prod.desc}</div>
            {/* Estrellas */}
            <div className="flex gap-1 mb-1">
              {[...Array(prod.rating)].map((_, idx) => (
                <svg key={idx} width="16" height="16" fill="#FE9124" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
              ))}
            </div>
            <div className="font-bold text-lg text-blue-600">${prod.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default BestSellers 