import PromoBanner from '../components/home/PromoBanner'
import HomeHeader from '../components/home/HomeHeader'
import HeroSection from '../components/home/HeroSection'
import FeaturesBar from '../components/home/FeaturesBar'
import CategoryGrid from '../components/home/CategoryGrid'
import RecommendedCombos from '../components/home/RecommendedCombos'
import BenefitsBanner from '../components/home/BenefitsBanner'
import BestSellers from '../components/home/BestSellers'
import ExploreCatalog from '../components/home/ExploreCatalog'
import Footer from '../components/layout/Footer'

const Home = () => (
  <div className="bg-gray-50">
    <PromoBanner />
    <HomeHeader />
    <HeroSection />
    <FeaturesBar />
    <CategoryGrid />
    <RecommendedCombos />
    <BenefitsBanner src="/banner2.png" />
    <BestSellers />
    <BenefitsBanner src="/banner2.png" />
    <ExploreCatalog />
    <Footer />
  </div>
)

export default Home
