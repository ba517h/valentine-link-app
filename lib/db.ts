import { neon } from "@neondatabase/serverless";

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(process.env.DATABASE_URL);
}

// --- Types ---

export interface ValentineLink {
  id: number;
  slug: string;
  recipient_name: string;
  theme: string;
  clicked_yes: boolean;
  created_at: string;
}

// --- Database operations ---

export async function initializeDatabase(): Promise<void> {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS valentine_links (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      recipient_name VARCHAR(255) NOT NULL,
      theme VARCHAR(50) NOT NULL DEFAULT 'classic',
      clicked_yes BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_valentine_links_slug ON valentine_links (slug)
  `;
}

export async function createLink(
  slug: string,
  recipientName: string,
  theme: string
): Promise<ValentineLink> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO valentine_links (slug, recipient_name, theme)
    VALUES (${slug}, ${recipientName}, ${theme})
    RETURNING *
  `;
  return rows[0] as ValentineLink;
}

export async function getLinkBySlug(
  slug: string
): Promise<ValentineLink | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM valentine_links WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as ValentineLink) ?? null;
}

export async function updateClickedYes(slug: string): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE valentine_links SET clicked_yes = true WHERE slug = ${slug}
  `;
}

export async function slugExists(slug: string): Promise<boolean> {
  const sql = getDb();
  const rows = await sql`
    SELECT 1 FROM valentine_links WHERE slug = ${slug} LIMIT 1
  `;
  return rows.length > 0;
}
