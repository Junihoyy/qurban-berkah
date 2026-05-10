import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ShopSection from '../components/ShopSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ShopSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
