import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLinkBySlug } from "@/lib/db";
import ValentineClient from "./ValentineClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const link = await getLinkBySlug(params.slug);

  if (!link) {
    return {};
  }

  const title = `Will you be my Valentine, ${link.recipient_name}?`;
  const description = "Someone has a special question for you...";

  return {
    title,
    description,
    openGraph: {
      title: `${title} 💕`,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} 💕`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ValentinePage({
  params,
}: {
  params: { slug: string };
}) {
  const link = await getLinkBySlug(params.slug);

  if (!link) {
    notFound();
  }

  return (
    <ValentineClient
      slug={link.slug}
      recipientName={link.recipient_name}
      theme={link.theme}
    />
  );
}
