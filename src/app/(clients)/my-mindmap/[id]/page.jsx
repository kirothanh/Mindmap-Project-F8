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
      title: mindmap?.seo?.title ?? mindmap.name,
      description: mindmap?.seo?.description ?? mindmap.description,
      openMindmap: {
        title: mindmap?.seo?.title ?? mindmap.name,
        description: mindmap?.seo?.description ?? mindmap.description,
        images: [
          mindmap?.seo?.image ??
          process.env.HOST_URL + "/img/so-do-tu-duy.jpg",
        ],
      },
    };
  }
  return {};
};

export default async function MindmapDetail({ params }) {
  const { id } = params;

  const user = {
    sub: null
  };

  try {
    const session = await getSession();
    if (session?.user) {
      Object.assign(user, session.user);
    }
  } catch (error) {
    console.error("Error getting session:", error);
  }

  try {
    const response = await fetch(
      `${process.env.HOST_URL}/api/mindmap?id=${id}&auth=false`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data: mindmap } = await response.json();

    if (!mindmap) {
      return notFound();
    }

    if ((mindmap.mode === "private" || !mindmap.mode) && mindmap.userId !== user.sub) {
      return notFound();
    }

    return (
      <MindmapContainer
        mindmap={mindmap}
        editable={mindmap.userId === user.sub}
      />
    );
  } catch (error) {
    console.error("Error fetching mindmap:", error);
    return notFound();
  }
}