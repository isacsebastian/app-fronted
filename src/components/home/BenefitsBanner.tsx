interface BenefitsBannerProps {
  src?: string;
}

const BenefitsBanner = ({ src = '/banner2.png' }: BenefitsBannerProps) => (
  <section className="w-full relative flex items-center justify-center min-h-[300px] md:min-h-[350px] py-8">
    <img
      src={src}
      alt="Beneficios productos"
      className="absolute inset-0 w-full h-full object-cover object-center z-0"
      style={{ filter: 'brightness(0.7)' }}
    />
    <div className="absolute inset-0 bg-blue-100/70 z-10" />
    {/* Sin texto, solo imagen y overlay */}
  </section>
)

export default BenefitsBanner 