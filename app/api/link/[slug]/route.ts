import { NextResponse } from "next/server";
import { getLinkBySlug } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const link = await getLinkBySlug(slug);

    if (!link) {
      return NextResponse.json(
        { error: "Valentine link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: link.id,
      slug: link.slug,
      recipientName: link.recipient_name,
      theme: link.theme,
      clickedYes: link.clicked_yes,
      createdAt: link.created_at,
    });
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
