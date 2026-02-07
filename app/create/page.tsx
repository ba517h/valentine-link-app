"use client";

import { useState } from "react";
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
    gradient: "from-rose-500 to-red-500",
    border: "border-rose-400",
    bg: "bg-rose-50",
    ring: "ring-rose-500",
    description: "Timeless red & white",
  },
  {
    id: "cute",
    name: "Cute",
    icon: Sparkles,
    gradient: "from-pink-400 to-fuchsia-500",
    border: "border-pink-400",
    bg: "bg-pink-50",
    ring: "ring-pink-500",
    description: "Playful pink vibes",
  },
  {
    id: "elegant",
    name: "Elegant",
    icon: Crown,
    gradient: "from-rose-700 to-rose-900",
    border: "border-rose-800",
    bg: "bg-rose-50",
    ring: "ring-rose-800",
    description: "Sophisticated & bold",
  },
];

export default function CreatePage() {
  const [slug, setSlug] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSlugChange = (value: string) => {
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
    setError("");
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      {/* Back navigation */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-10 px-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 mb-6 shadow-lg shadow-rose-500/20">
          <Heart className="w-7 h-7 text-white fill-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Create Your{" "}
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Valentine Link
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Fill in the details below and share the love
        </p>
      </div>

      {/* Form / Success */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {successUrl ? (
          /* ---- Success state ---- */
          <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100 p-8 sm:p-10 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your link is ready! 🎉
            </h2>
            <p className="text-gray-500 mb-8">
              Copy and share it with your love 💕
            </p>

            {/* URL display */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Your link</p>
              <p className="text-rose-600 font-semibold text-lg break-all">
                {successUrl}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-200"
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
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold py-3 px-6 rounded-xl border border-rose-200 hover:bg-rose-50 transition-all duration-200"
              >
                <Eye className="w-5 h-5" />
                Preview
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-2 text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Create Another
            </button>
          </div>
        ) : (
          /* ---- Form state ---- */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100 p-8 sm:p-10"
          >
            <div className="space-y-8">
              {/* Error message */}
              {error && (
                <div className="bg-red-50 text-red-700 text-sm font-medium px-4 py-3 rounded-xl border border-red-100 animate-fade-in">
                  {error}
                </div>
              )}

              {/* Custom URL input */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Custom URL
                </label>
                <div className="flex rounded-xl border border-gray-200 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-400/20 transition-all duration-200 overflow-hidden">
                  <span className="inline-flex items-center px-4 bg-gray-50 text-gray-500 text-sm border-r border-gray-200">
                    valentine.app/
                  </span>
                  <input
                    id="slug"
                    type="text"
                    placeholder="my-valentine"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none text-sm disabled:opacity-50"
                  />
                </div>
                {slug && (
                  <p className="mt-2 text-sm text-rose-600 font-medium">
                    Preview: valentine.app/{slug}
                  </p>
                )}
              </div>

              {/* Recipient name input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all duration-200 text-gray-900 placeholder-gray-400 focus:outline-none text-sm disabled:opacity-50"
                />
                <div className="flex justify-between mt-2">
                  {recipientName ? (
                    <p className="text-sm text-gray-500">
                      They&apos;ll see:{" "}
                      <span className="text-rose-600 font-medium">
                        &quot;Hey {recipientName}, will you be my
                        Valentine?&quot;
                      </span>
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-gray-400 shrink-0 ml-2">
                    {recipientName.length}/100
                  </p>
                </div>
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Choose a Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedTheme(theme.id)}
                        disabled={isLoading}
                        className={`
                          relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                          ${
                            isSelected
                              ? `${theme.border} ${theme.bg} ring-2 ${theme.ring} ring-offset-2`
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }
                        `}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-sm`}
                        >
                          <theme.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-sm text-gray-900">
                          {theme.name}
                        </span>
                        <span className="text-xs text-gray-500 hidden sm:block">
                          {theme.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
