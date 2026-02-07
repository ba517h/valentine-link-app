import { NextResponse } from "next/server";
import { getLinkBySlug, updateClickedYes } from "@/lib/db";

export async function POST(
  request: Request,
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

    const body = await request.json();
    const { response } = body;

    if (!response || !["yes", "no"].includes(response)) {
      return NextResponse.json(
        { error: "Response must be 'yes' or 'no'" },
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

    if (response === "yes") {
      await updateClickedYes(slug);
    }

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("Error recording response:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
