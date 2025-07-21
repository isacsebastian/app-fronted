import { useState } from 'react';

const images = [
  { src: '/banner.png', alt: 'Mesas Plegables' },
  { src: '/banner.png', alt: 'Oferta Especial' },
  { src: '/banner.png', alt: 'Promoción Limitada' },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center relative">
      <div className="w-full aspect-[16/6] md:aspect-[16/6] relative">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Navegación: flechas pequeñas y dots juntos, centrados debajo de la imagen */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-3 mt-0 py-4 w-full bg-gray-50">
          <button
            className="text-2xl text-gray-500 hover:text-blue-600 px-2"
            onClick={prev}
            aria-label="Anterior"
          >
            {'<'}
          </button>
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${current === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Ir a la imagen ${idx + 1}`}
              />
            ))}
          </div>
          <button
            className="text-2xl text-gray-500 hover:text-blue-600 px-2"
            onClick={next}
            aria-label="Siguiente"
          >
            {'>'}
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection; 