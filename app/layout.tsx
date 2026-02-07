import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://valentine-link-app.vercel.app";

export const metadata: Metadata = {
  title: "Create a Valentine Link They Can't Refuse",
  description:
    "Send a playful Valentine link with a YES button that grows bigger each time they click NO. Free and fun!",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Create a Valentine Link They Can't Refuse 💝",
    description:
      "Send a playful Valentine link with a YES button that grows bigger each time they click NO. Free and fun!",
    url: siteUrl,
    siteName: "Valentine Link",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Valentine Link - Create a link they can't refuse",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a Valentine Link They Can't Refuse 💝",
    description:
      "Send a playful Valentine link with a YES button that grows bigger each time they click NO. Free and fun!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
