import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export const middleware = withMiddlewareAuthRequired(async (req) => {
  const path = req.nextUrl.pathname;
  const id = path.replace("/my-mindmap", "").replace("/", "");

  const response = await fetch(
    `${process.env.HOST_URL}/api/mindmap?id=${id}&auth=false`
  );
  const mindmap = await response.json();
  let mode = "private";
  if (mindmap?.data?.mode) {
    mode = mindmap.data.mode;
  }

  if (mode === "private") {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/my-mindmap/:path*"],
};
