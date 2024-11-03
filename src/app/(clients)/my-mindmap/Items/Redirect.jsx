"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Redirect({ id }) {
  const router = useRouter();
  let toPage = "/my-mindmap/" + id;

  if (!id) {
    toPage = "/my-mindmap/"
  }

  useEffect(() => {
    router.replace(toPage);
    router.refresh();
  }, [router, toPage]);

  return
}
