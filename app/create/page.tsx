"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Crown,
  ArrowLeft,
  Loader2,
  Check,
  Copy,
  RefreshCw,
  Eye,
} from "lucide-react";

const themes = [
  {
    id: "classic",
    name: "Classic",
    icon: Heart,
    color: "bg-[#FF1744]",
    selectedBorder: "border-[#FF1744]",
    selectedBg: "bg-red-50",
    description: "Timeless red & white",
  },
  {
    id: "cute",
    name: "Cute",
    icon: Sparkles,
    color: "bg-[#FF6B9D]",
    selectedBorder: "border-[#FF6B9D]",
    selectedBg: "bg-pink-50",
    description: "Playful pink vibes",
  },
  {
    id: "elegant",
    name: "Elegant",
    icon: Crown,
    color: "bg-[#4A0E4E]",
    selectedBorder: "border-[#4A0E4E]",
    selectedBg: "bg-purple-50",
    description: "Sophisticated & bold",
  },
];

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export default function CreatePage() {
  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const [recipientName, setRecipientName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkSlug = useCallback(async (value: string) => {
    if (!SLUG_REGEX.test(value)) {
      setSlugStatus("invalid");
      return;
    }

    setSlugStatus("checking");

    try {
      const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(value)}`);
      const data = await res.json();
      setSlugStatus(data.available ? "available" : "taken");
    } catch {
      setSlugStatus("idle");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleSlugChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 50);
    setSlug(cleaned);
    setError("");

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!cleaned) {
      setSlugStatus("idle");
      return;
    }

    if (cleaned.length < 3) {
      setSlugStatus("invalid");
      return;
    }

    debounceTimer.current = setTimeout(() => checkSlug(cleaned), 500);
  };

  const handleNameChange = (value: string) => {
    if (value.length <= 100) {
      setRecipientName(value);
      setError("");
    }
  };

  const validate = (): string | null => {
    if (!slug || slug.length < 3) {
      return "Slug must be at least 3 characters long";
    }
    if (slug.startsWith("-") || slug.endsWith("-")) {
      return "Slug cannot start or end with a hyphen";
    }
    if (!recipientName.trim()) {
      return "Recipient name is required";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          recipientName: recipientName.trim(),
          theme: selectedTheme,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccessUrl(`${window.location.origin}${data.fullUrl}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(successUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSlug("");
    setRecipientName("");
    setSelectedTheme("classic");
    setError("");
    setSuccessUrl("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5EC] via-[#FFF0F3] to-[#FFC9DE]">
      {/* Back navigation */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors bg-white border-2 border-black rounded-full px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-10 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF1744] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <Heart className="w-8 h-8 text-white fill-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Create Your{" "}
          <span className="text-[#FF1744]">Valentine Link</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Fill in the details below and share the love
        </p>
      </div>

      {/* Form / Success */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {successUrl ? (
          /* ---- Success state ---- */
          <div className="bg-white rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-400 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Your link is ready! 🎉
            </h2>
            <p className="text-gray-500 mb-8">
              Copy and share it with your love 💕
            </p>

            {/* URL display */}
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1 font-medium">Your link</p>
              <p className="text-[#FF1744] font-bold text-lg break-all">
                {successUrl}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FF1744] text-white font-bold py-3 px-6 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>

              <a
                href={successUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold py-3 px-6 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              >
                <Eye className="w-5 h-5" />
                Preview
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-bold py-2 text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Create Another
            </button>
          </div>
        ) : (
          /* ---- Form state ---- */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10"
          >
            <div className="space-y-8">
              {/* Error message */}
              {error && (
                <div className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border-2 border-red-300 animate-fade-in">
                  {error}
                </div>
              )}

              {/* Custom URL input */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-bold text-gray-900 mb-2"
                >
                  Custom URL
                </label>
                <div
                  className={`flex rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                    slugStatus === "available"
                      ? "border-green-500"
                      : slugStatus === "taken" || slugStatus === "invalid"
                      ? "border-red-500"
                      : "border-black focus-within:border-[#FF1744] focus-within:shadow-[0_0_0_3px_rgba(255,23,68,0.15)]"
                  }`}
                >
                  <span className="inline-flex items-center px-4 bg-gray-100 text-gray-500 text-sm font-medium border-r-2 border-black">
                    valentine.app/
                  </span>
                  <input
                    id="slug"
                    type="text"
                    placeholder="my-valentine"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-medium disabled:opacity-50"
                  />
                  {slugStatus === "checking" && (
                    <span className="inline-flex items-center pr-4">
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    </span>
                  )}
                </div>
                <div className="h-6 mt-2 flex items-center">
                  {slugStatus === "checking" && (
                    <span className="text-gray-400 text-sm font-medium">Checking...</span>
                  )}
                  {slugStatus === "available" && (
                    <span className="text-green-600 font-bold text-sm">✓ Available!</span>
                  )}
                  {slugStatus === "taken" && (
                    <span className="text-red-600 font-bold text-sm">✗ This URL is already taken. Try another!</span>
                  )}
                  {slugStatus === "invalid" && slug.length > 0 && (
                    <span className="text-red-600 font-bold text-sm">
                      {slug.length < 3
                        ? "Must be at least 3 characters"
                        : slug.startsWith("-") || slug.endsWith("-")
                        ? "Cannot start or end with a hyphen"
                        : "Invalid format (use lowercase, numbers, hyphens)"}
                    </span>
                  )}
                </div>
              </div>

              {/* Recipient name input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-900 mb-2"
                >
                  Recipient&apos;s Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Alex"
                  value={recipientName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-black focus:border-[#FF1744] focus:shadow-[0_0_0_3px_rgba(255,23,68,0.15)] transition-all duration-200 text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-medium disabled:opacity-50"
                />
                <div className="flex justify-between mt-2">
                  {recipientName ? (
                    <p className="text-sm text-gray-500">
                      They&apos;ll see:{" "}
                      <span className="text-[#FF1744] font-bold">
                        &quot;Hey {recipientName}, will you be my
                        Valentine?&quot;
                      </span>
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-gray-400 shrink-0 ml-2 font-medium">
                    {recipientName.length}/100
                  </p>
                </div>
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Choose a Theme
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {themes.map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        disabled={isLoading}
                        className={`
                          relative flex flex-row items-center gap-3 p-3 md:flex-col md:items-center md:gap-2 md:p-5 rounded-2xl border-[3px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                          ${
                            isSelected
                              ? `${theme.selectedBorder} ${theme.selectedBg} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                              : "border-gray-200 hover:border-black bg-white"
                          }
                        `}
                      >
                        <div
                          className={`w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-xl ${theme.color} flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                        >
                          <theme.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="flex flex-col items-start md:items-center">
                          <span className="font-bold text-sm text-gray-900">
                            {theme.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {theme.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || slugStatus !== "available" || !recipientName.trim()}
                className="w-full bg-[#FF1744] text-white font-bold py-4 rounded-full border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-white" />
                    Create My Link
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
