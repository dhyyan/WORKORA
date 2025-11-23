import { Hero } from '../components/LandingPage/Hero';
import { HowItWorks } from '../components/LandingPage/HowItWorks';
import { FeaturedCategories } from '../components/LandingPage/FeaturedCategories';
import { Footer } from '../components/LandingPage/Footer';
import { CTASection } from '../components/LandingPage/CTASection';
import { Testimonials } from '../components/LandingPage/Testimonials';
import { WhyChooseUs } from '../components/LandingPage/WhyChooseUs';

const LandingPage = () => {
  return <div className="w-full min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <FeaturedCategories />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>;
}

export default LandingPage
