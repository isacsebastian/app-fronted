const features = [
  { label: 'Alta Resistencia', icon: '/icons/secure.svg' },
  { label: 'Fácil Armado', icon: '/icons/settings.svg' },
  { label: 'Diseño Práctico', icon: '/icons/like.svg' },
  { label: 'Material Duradero', icon: '/icons/energy.svg' },
]

const FeaturesBar = () => (
  <div className="w-full flex flex-wrap justify-center items-center py-3 gap-8 text-white font-semibold text-base md:text-lg" style={{ backgroundColor: '#FE9124' }}>
    {features.map((f, i) => (
      <span key={i} className="flex items-center gap-2">
        <img src={f.icon} alt="" className="h-6 w-6" />
        {f.label}
      </span>
    ))}
  </div>
)

export default FeaturesBar 