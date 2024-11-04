import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import MindmapContainer from "./MindmapContainer";
import { notFound } from "next/navigation";
import { getMindmap } from "@/services/mindmapService";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const mindmap = await getMindmap(id);

  if (mindmap) {
    return {
      title: mindmap?.seo?.title ? mindmap?.seo?.title : mindmap.name,
      description: mindmap?.seo?.description
        ? mindmap?.seo?.description
        : mindmap.description,
      openMindmap: {
        title: mindmap?.seo?.title ? mindmap?.seo?.title : mindmap.name,
        description: mindmap?.seo?.description
          ? mindmap?.seo?.description
          : mindmap.description,
        images: [
          mindmap?.seo?.image
            ? mindmap?.seo?.image
            : process.env.HOST_URL + "/img/so-do-tu-duy.jpg",
        ],
      },
    };
  }
};

export default async function MindmapDetail({ params }) {
  const { id } = params;

  let user = {};
  const session = await getSession();
  if (session) {
    user = session?.user;
  }

  // Lấy mindmap bỏ qua xác thực
  const response = await fetch(
    `${process.env.HOST_URL}/api/mindmap?id=${id}&auth=false`
  );
  const { data: mindmap } = await response.json();

  if (!mindmap) {
    notFound();
  }

  if (mindmap.mode === "private" || !mindmap.mode) {
    if (mindmap.userId !== user.sub) {
      notFound();
    }
  }

  return (
    <>
      <MindmapContainer
        mindmap={mindmap}
        editable={mindmap.userId === user.sub}
      />
    </>
  );
}
