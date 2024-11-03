import { getMindmap, saveMindmap } from "@/services/mindmapService";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const isAuth = request.nextUrl.searchParams.get("auth");
  const check = isAuth === "false" ? false : true;
  const data = await getMindmap(id, check)

  if (!data) {
    return Response.json({ status: "error" })
  }

  return Response.json({ status: "success", data: data });
}

export async function POST(request) {
  const { id, type, ...body } = await request.json();
  const success = await saveMindmap(id, body);

  if (success) {
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ status: "error" }), { status: 500 });
  }
}