import { Demo } from '@/components/Demo';
import { GlobeDemo } from '@/components/GlobeDemo';
import { GlowingEffectDemoSecond } from '@/components/GlowingCard';
import { HeroScrollDemo } from '@/components/HeroScroll';
import { NavbarDemo } from '@/components/Navbar';
import { PointerHighlightDemo } from '@/components/PointerHighlighter';
import { Navbar, NavbarLogo, NavItems, NavbarButton } from '@/components/ui/resizable-navbar';
import Footer from '@/components/Footer';
import { Pencil, Share2, Users, Sparkles, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
  ];
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



