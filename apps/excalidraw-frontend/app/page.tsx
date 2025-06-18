import { Demo } from '@/components/Demo';
import { GlobeDemo } from '@/components/GlobeDemo';
import { GlowingEffectDemoSecond } from '@/components/GlowingCard';
import { HeroScrollDemo } from '@/components/HeroScroll';
import { NavbarDemo } from '@/components/Navbar';
import { PointerHighlightDemo } from '@/components/PointerHighlighter';
import { Navbar, NavbarLogo, NavItems, NavbarButton } from '@/components/ui/resizable-navbar';
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
      <GlowingEffectDemoSecond />
      <Demo />
      <GlobeDemo />


      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-xl">Picasso</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://github.com/Harsh-Wardhan-404/Picasso" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



