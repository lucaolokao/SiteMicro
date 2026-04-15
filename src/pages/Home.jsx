import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AIBanner from '../components/home/AIBanner';
import StatsSection from '../components/home/StatsSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <AIBanner />
      <StatsSection />
    </main>
  );
}
