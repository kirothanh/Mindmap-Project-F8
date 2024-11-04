import {
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const path = req.nextUrl.pathname;
  const id = path.replace("/my-mindmap", "").replace("/", "");

  const response = await fetch(
    `${process.env.HOST_URL}/api/mindmap?id=${id}&auth=false`,
  );
  const mindmap = await response.json();
  let mode = "private";
  if (mindmap?.data?.mode) {
    mode = mindmap.data.mode;
  }

  if (mode === "private") {
    const session = await getSession();
    if (session) {
      const { user } = session;
      if (!user) {
        return NextResponse.redirect(new URL("/api/auth/login", req.url));
      }
    }
  }
};

export const config = {
  matcher: ["/my-mindmap/:path*"],
};