// app/api/session/route.js
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(req) {
  const session = await getSession(req);
  return new Response(JSON.stringify({ user: session?.user || null }), {
    headers: { "Content-Type": "application/json" },
  });
}
