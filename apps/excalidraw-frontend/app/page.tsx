import { HeroScrollDemo } from '@/components/HeroScroll';
import { PointerHighlightDemo } from '@/components/PointerHighlighter';
import { Pencil, Share2, Users, Sparkles, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* <img src="/logo.png" alt="" /> */}
      <Image
        src="/logo.png"
        alt="Picasso Logo"
        width={150}
        height={40}
        className="h-10 w-auto"
      />
      {/* Hero Section */}
      {/* <PointerHighlightDemo /> */}
      <HeroScrollDemo />
      {/* <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center relative z-10">
            <h1 className="text-6xl font-bold mb-6 text-glow">
              Collaborative Drawing
              <span className="text-purple-400"> Reimagined</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Create, collaborate, and share beautiful diagrams and sketches in real-time.
              Your canvas, your rules, our technology.
            </p>
            <div className="flex justify-center gap-6">
              <Link href={"/signin"}>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 button-glow hover:bg-purple-700">
                  Sign In
                </button>

              </Link>
              <Link href={"/signup"}>
                <button className="border border-purple-500/30 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-purple-500 hover:bg-purple-950/50">
                  Sign up
                </button>

              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Feature Preview */}
      {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-32">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 glow">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=2000"
              alt="Excalidraw Interface Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Pencil className="w-6 h-6 text-purple-400" />}
            title="Intuitive Drawing"
            description="Smooth, responsive drawing experience with customizable tools and shapes."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-purple-400" />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, see changes instantly."
          />
          <FeatureCard
            icon={<Share2 className="w-6 h-6 text-purple-400" />}
            title="Easy Sharing"
            description="Share your creations with a simple link, export in multiple formats."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-xl">Excalidraw Clone</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-gray-900/70">
      <div className="bg-purple-900/20 rounded-lg p-3 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
