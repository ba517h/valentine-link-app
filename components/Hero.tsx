import Link from "next/link";
import { Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-red-50">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] animate-float opacity-20">
          <Heart className="w-16 h-16 text-rose-400 fill-rose-400" />
        </div>
        <div className="absolute top-[20%] right-[15%] animate-float-delayed opacity-15">
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
        </div>
        <div className="absolute bottom-[25%] left-[20%] animate-float-delayed opacity-10">
          <Heart className="w-20 h-20 text-red-300 fill-red-300" />
        </div>
        <div className="absolute top-[60%] right-[10%] animate-float opacity-15">
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
        </div>
        <div className="absolute top-[40%] left-[50%] animate-float-delayed opacity-10">
          <Heart className="w-14 h-14 text-pink-300 fill-pink-300" />
        </div>
        <div className="absolute bottom-[15%] right-[30%] animate-float opacity-20">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-rose-200 rounded-full px-5 py-2 mb-8 text-sm text-rose-700 font-medium">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Valentine&apos;s Day 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          Create a Valentine Link
          <br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            They Can&apos;t Refuse
          </span>{" "}
          💝
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The Yes button gets bigger every time they say no.
          <br className="hidden sm:block" />
          It&apos;s adorable, it&apos;s playful, and it{" "}
          <span className="text-rose-600 font-semibold">works</span>.
        </p>

        <Link
          href="/create"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          Create Your Link Free
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          No sign-up required. Free forever.
        </p>
      </div>
    </section>
  );
}
