import { Demo } from '@/components/Demo';
import { GlobeDemo } from '@/components/GlobeDemo';
import { GlowingEffectDemoSecond } from '@/components/GlowingCard';
import { HeroScrollDemo } from '@/components/HeroScroll';
import { NavbarDemo } from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <NavbarDemo />
      <div className="-mt-20">
        <HeroScrollDemo />
      </div>
      <div className='my-20'>
        <Demo />
      </div>
      <div id="features" className='pt-20'><GlowingEffectDemoSecond /></div>
      <GlobeDemo />

      {/* Footer */}
      <Footer />
    </div>
  );
}



