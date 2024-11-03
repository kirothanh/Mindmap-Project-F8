import React from "react";
import MindMapList from "./MindMapList";
import Link from "next/link";

export const metadata = {
  title: `Mindmap của tôi - ${process.env.APP_NAME}`,
};

export const dynamic = "force-dynamic";

export default function MyMindmapPage() {
  return (
    <div className="px-2">
      <h1 className="text-3xl font-bold py-4">Mindmap của tôi</h1>
      <Link
        href="/my-mindmap/create"
        className="capitalize bg-blue-400 text-white py-2 px-4 rounded-lg"
      >
        Thêm mới
      </Link>
      <MindMapList />
    </div>
  );
}
