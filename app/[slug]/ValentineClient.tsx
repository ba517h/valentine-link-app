"use client";

import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

const noMessages = [
  "Are you sure? 🥺",
  "Really? Just think about it... 💭",
  "The YES button is looking pretty good right now... 😊",
  "Come on, you know you want to... 💝",
  "I believe in you! Click YES! ✨",
];

const themeStyles = {
  classic: {
    bg: "from-[#FF6B9D] via-[#FF8FAB] to-[#FFC3D7]",
    orb1: "bg-pink-400/30",
    orb2: "bg-rose-600/20",
    heartColor: "text-white fill-white",
    yesText: "text-rose-600",
    yesHover: "hover:bg-rose-50",
    noBg: "bg-white/20",
    noBorder: "border-white/30",
    noHover: "hover:bg-white/30",
    confettiColors: ["#f43f5e", "#ec4899", "#f472b6", "#fb7185", "#ff6b9d"],
  },
  cute: {
    bg: "from-[#FFE5EC] via-[#FFD6E0] to-[#FFC9DE]",
    orb1: "bg-pink-300/40",
    orb2: "bg-fuchsia-300/30",
    heartColor: "text-pink-500 fill-pink-500",
    yesText: "text-pink-600",
    yesHover: "hover:bg-pink-50",
    noBg: "bg-pink-400/15",
    noBorder: "border-pink-300/40",
    noHover: "hover:bg-pink-400/25",
    confettiColors: ["#f9a8d4", "#f472b6", "#ec4899", "#fbcfe8", "#fce7f3"],
  },
  elegant: {
    bg: "from-[#4A0E4E] via-[#6B3A6E] to-[#81689D]",
    orb1: "bg-purple-500/20",
    orb2: "bg-fuchsia-800/20",
    heartColor: "text-purple-200 fill-purple-200",
    yesText: "text-purple-700",
    yesHover: "hover:bg-purple-50",
    noBg: "bg-white/10",
    noBorder: "border-white/20",
    noHover: "hover:bg-white/20",
    confettiColors: ["#a855f7", "#c084fc", "#d8b4fe", "#e9d5ff", "#f3e8ff"],
  },
} as const;

type Theme = keyof typeof themeStyles;

interface ValentineClientProps {
  slug: string;
  recipientName: string;
  theme: string;
}

function FloatingHearts({ heartColor }: { heartColor: string }) {
  const hearts = [
    { top: "8%", left: "12%", size: "w-6 h-6", delay: "0s", duration: "6s", opacity: "opacity-20" },
    { top: "15%", left: "80%", size: "w-5 h-5", delay: "1s", duration: "7s", opacity: "opacity-15" },
    { top: "45%", left: "5%", size: "w-7 h-7", delay: "2s", duration: "8s", opacity: "opacity-10" },
    { top: "70%", left: "85%", size: "w-4 h-4", delay: "0.5s", duration: "6.5s", opacity: "opacity-20" },
    { top: "30%", left: "90%", size: "w-5 h-5", delay: "3s", duration: "7.5s", opacity: "opacity-15" },
    { top: "85%", left: "15%", size: "w-6 h-6", delay: "1.5s", duration: "6s", opacity: "opacity-10" },
    { top: "55%", left: "50%", size: "w-4 h-4", delay: "2.5s", duration: "8s", opacity: "opacity-15" },
    { top: "20%", left: "40%", size: "w-5 h-5", delay: "0.8s", duration: "7s", opacity: "opacity-10" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h, i) => (
        <div
          key={i}
          className={`absolute animate-float ${h.opacity}`}
          style={{
            top: h.top,
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          <Heart className={`${h.size} ${heartColor}`} />
        </div>
      ))}
    </div>
  );
}

export default function ValentineClient({
  slug,
  recipientName,
  theme,
}: ValentineClientProps) {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const t = themeStyles[theme as Theme] ?? themeStyles.classic;
  const isCuteTheme = theme === "cute";
  const textColor = isCuteTheme ? "text-pink-800" : "text-white";
  const subTextColor = isCuteTheme ? "text-pink-600/80" : "text-white/90";
  const mutedTextColor = isCuteTheme ? "text-pink-500/60" : "text-white/70";

  const yesScale = 1 + noCount * 0.2;
  const noScale = Math.max(0.3, 1 - noCount * 0.15);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: t.confettiColors as unknown as string[],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: t.confettiColors as unknown as string[],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: t.confettiColors as unknown as string[],
    });

    frame();
  }, [t.confettiColors]);

  const handleYes = async () => {
    setAccepted(true);
    fireConfetti();

    try {
      await fetch(`/api/link/${slug}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "yes" }),
      });
    } catch {
      // Fire-and-forget — celebration still shows
    }
  };

  const handleNo = () => {
    setNoCount((prev) => prev + 1);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${t.bg}`}
    >
      <FloatingHearts heartColor={t.heartColor} />

      {/* Gradient orbs */}
      <div className={`absolute top-1/4 left-1/4 w-80 h-80 ${t.orb1} rounded-full blur-3xl`} />
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${t.orb2} rounded-full blur-3xl`} />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-lg mx-auto w-full">
        {!accepted ? (
          <>
            {/* Heart icon */}
            <div className="mb-6 sm:mb-8 animate-pulse-slow">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Heart className={`w-8 h-8 sm:w-10 sm:h-10 ${t.heartColor}`} />
              </div>
            </div>

            {/* Question */}
            <h1
              className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${textColor} mb-3 sm:mb-4 leading-snug sm:leading-tight`}
            >
              Will you be my Valentine, {recipientName}? 💕
            </h1>

            {/* Playful message on No clicks */}
            <div className="h-8 sm:h-10 mb-6 sm:mb-8 flex items-center">
              {noCount > 0 && (
                <p className={`${subTextColor} text-base sm:text-lg md:text-xl animate-fade-in`}>
                  {noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="relative z-0 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handleYes}
                style={{
                  transform: `scale(${yesScale})`,
                  transition: "transform 0.3s ease",
                }}
                className={`relative z-0 bg-white ${t.yesText} font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg shadow-black/10 hover:shadow-xl ${t.yesHover} active:scale-95 text-base sm:text-lg origin-center`}
              >
                YES! 💕
              </button>

              <button
                onClick={handleNo}
                style={{
                  transform: `scale(${noScale})`,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  opacity: Math.max(0.4, 1 - noCount * 0.12),
                }}
                className={`relative z-0 ${t.noBg} backdrop-blur-sm ${isCuteTheme ? "text-pink-700" : "text-white"} font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border ${t.noBorder} ${t.noHover} active:scale-95 text-sm sm:text-base origin-center`}
              >
                No
              </button>
            </div>
          </>
        ) : (
          /* Celebration state */
          <div className="flex flex-col items-center animate-fade-in">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🎉</div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${textColor} mb-3 sm:mb-4`}
            >
              Yay! 🎉
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl ${subTextColor} mb-8 sm:mb-10`}>
              You said{" "}
              <span className={`font-bold ${textColor}`}>YES!</span>
            </p>

            {/* Celebration GIF */}
            <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/20 mb-6 sm:mb-8 bg-white/10 backdrop-blur-sm border border-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGEwZmZ4c3l6ZHN6dWwxaDA4aGd3N3VuampqM2JpYTdyN2NvbXJ4cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufdipQqU2lhNA4g/giphy.gif"
                alt="Celebration"
                className="w-full h-full object-cover"
              />
            </div>

            <p className={`${mutedTextColor} text-xs sm:text-sm`}>
              Happy Valentine&apos;s Day! 💝
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
