import { NextResponse } from "next/server";
import { createLink, slugExists, initializeDatabase } from "@/lib/db";

const VALID_THEMES = ["classic", "cute", "elegant"];
const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, recipientName, theme } = body;

    // Validate slug
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    if (!SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Slug must be 3-64 characters, lowercase letters, numbers, and hyphens only",
        },
        { status: 400 }
      );
    }

    // Validate recipient name
    if (
      !recipientName ||
      typeof recipientName !== "string" ||
      recipientName.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Recipient name is required" },
        { status: 400 }
      );
    }

    if (recipientName.trim().length > 100) {
      return NextResponse.json(
        { error: "Recipient name must be 100 characters or less" },
        { status: 400 }
      );
    }

    // Validate theme
    if (!theme || !VALID_THEMES.includes(theme)) {
      return NextResponse.json(
        { error: `Theme must be one of: ${VALID_THEMES.join(", ")}` },
        { status: 400 }
      );
    }

    // Ensure table exists
    await initializeDatabase();

    // Check for duplicate slug
    if (await slugExists(slug)) {
      return NextResponse.json(
        { error: "This slug is already taken. Try a different one." },
        { status: 409 }
      );
    }

    // Create the link
    const link = await createLink(slug, recipientName.trim(), theme);

    return NextResponse.json(
      {
        success: true,
        slug: link.slug,
        fullUrl: `/${link.slug}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
