import { notFound } from "next/navigation";
import { getLinkBySlug } from "@/lib/db";
import ValentineClient from "./ValentineClient";

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
