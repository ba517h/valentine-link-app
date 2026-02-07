import { Link, UserCircle, Share2 } from "lucide-react";

const steps = [
  {
    icon: Link,
    step: "01",
    title: "Pick your custom URL",
    description:
      "Choose a unique, memorable slug for your Valentine link that's easy to share.",
    color: "bg-valentine-primary",
    rotate: "md:-rotate-1",
  },
  {
    icon: UserCircle,
    step: "02",
    title: "Add their name & theme",
    description:
      "Personalize it with their name and pick a theme that matches your style.",
    color: "bg-valentine-accent",
    rotate: "md:rotate-1",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share your unique link",
    description:
      "Send them the link and watch as the Yes button becomes irresistible!",
    color: "bg-valentine-secondary",
    rotate: "md:-rotate-1",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-[#FFC9DE]/30 to-[#FFE5EC]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border-[3px] border-black rounded-full px-4 py-1.5 mb-5 text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center justify-center w-5 h-5 bg-valentine-accent rounded-full border-2 border-black text-xs">
              ⚡
            </span>
            Super easy
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Three simple steps to the sweetest Valentine&apos;s surprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className={`group relative bg-white p-8 md:p-10 rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 ${item.rotate} ${
                idx === 0
                  ? "animate-fade-in-up"
                  : idx === 1
                  ? "animate-fade-in-up-delay-1"
                  : "animate-fade-in-up-delay-2"
              }`}
            >
              {/* Icon badge */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${item.color} border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6`}
              >
                <item.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>

              {/* Step number */}
              <span className="absolute top-6 right-8 text-5xl font-extrabold text-gray-100 group-hover:text-valentine-accent/30 transition-colors duration-300">
                {item.step}
              </span>

              <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
