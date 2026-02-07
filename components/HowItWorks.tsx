import { Link, UserCircle, Share2 } from "lucide-react";

const steps = [
  {
    icon: Link,
    step: "01",
    title: "Pick your custom URL",
    description:
      "Choose a unique, memorable slug for your Valentine link that's easy to share.",
  },
  {
    icon: UserCircle,
    step: "02",
    title: "Add their name & choose a theme",
    description:
      "Personalize it with their name and pick a theme that matches your style.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share your unique link",
    description:
      "Send them the link and watch as the Yes button becomes irresistible!",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Three simple steps to create the sweetest Valentine&apos;s surprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative text-center p-8 rounded-3xl bg-gradient-to-b from-rose-50/80 to-white border border-rose-100 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 mb-6 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>

              <span className="absolute top-6 right-8 text-5xl font-bold text-rose-100 group-hover:text-rose-200 transition-colors duration-300">
                {item.step}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
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
