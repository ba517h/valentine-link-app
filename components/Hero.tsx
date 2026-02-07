import Link from "next/link";
import { Heart } from "lucide-react";

function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  );
}

function SquigglyArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
    >
      <path d="M10 30 Q30 10 50 30 Q70 50 90 30" />
      <path d="M80 25 L92 30 L82 38" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFE5EC] via-[#FFF0F3] to-[#FFC9DE]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <Star className="absolute top-[8%] left-[8%] w-6 h-6 text-valentine-accent animate-wiggle" />
        <Star className="absolute top-[15%] right-[12%] w-4 h-4 text-valentine-primary/60 animate-spin-slow" />
        <Star className="absolute bottom-[20%] left-[15%] w-5 h-5 text-valentine-accent animate-wiggle" />
        <Star className="absolute top-[45%] right-[8%] w-3 h-3 text-valentine-secondary animate-spin-slow" />
        <Star className="absolute bottom-[35%] right-[20%] w-5 h-5 text-valentine-accent/70 animate-wiggle" />
        <Star className="absolute top-[70%] left-[6%] w-4 h-4 text-valentine-primary/40 animate-spin-slow" />

        {/* Floating hearts */}
        <Heart className="absolute top-[12%] right-[25%] w-8 h-8 text-valentine-primary/20 fill-valentine-primary/20 animate-float rotate-12" />
        <Heart className="absolute bottom-[15%] left-[25%] w-10 h-10 text-valentine-secondary/20 fill-valentine-secondary/20 animate-float-delayed -rotate-12" />
        <Heart className="absolute top-[55%] left-[45%] w-6 h-6 text-valentine-primary/15 fill-valentine-primary/15 animate-float rotate-6" />

        {/* Squiggly arrow pointing to CTA */}
        <SquigglyArrow className="absolute bottom-[28%] left-[8%] w-28 h-14 text-valentine-primary/30 rotate-[20deg] hidden lg:block" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border-[3px] border-black rounded-full px-5 py-2 mb-8 text-sm font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up">
          <span className="flex items-center justify-center w-6 h-6 bg-valentine-accent rounded-full border-2 border-black text-xs">
            ✨
          </span>
          <span>Valentine&apos;s Day 2026</span>
        </div>

        {/* Headline with inline decorative elements */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1] animate-fade-in-up-delay-1">
          Create a{" "}
          <span className="inline-flex items-center align-middle">
            <span className="inline-flex items-center justify-center bg-valentine-primary text-white px-4 py-1 rounded-2xl border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-4xl sm:text-5xl md:text-6xl mx-1">
              <Heart className="w-7 h-7 sm:w-9 sm:h-9 fill-white mr-1" />
              Link
            </span>
          </span>
          <br className="hidden sm:block" />
          They Can&apos;t Refuse
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
          The Yes button gets bigger every time they say no.
          <br className="hidden sm:block" />
          It&apos;s adorable, it&apos;s playful, and it{" "}
          <span className="bg-valentine-accent/40 px-2 py-0.5 rounded-lg font-bold text-gray-900">
            works
          </span>
          .
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up-delay-2">
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-2 bg-valentine-primary text-white text-lg font-bold px-10 py-5 rounded-full border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
          >
            Create Your Link Free
            <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">
              →
            </span>
          </Link>

          <p className="mt-6 text-sm text-gray-500 font-medium">
            No sign-up required. Free forever.
          </p>
        </div>
      </div>
    </section>
  );
}
