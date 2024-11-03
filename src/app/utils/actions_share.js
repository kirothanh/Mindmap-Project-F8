"use server"

import { getMindmap, saveMindmap, } from "@/services/mindmapService";

export const handleSaveShare = async (formData, id) => {
  const mode = formData.get("mode");
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const mindmap = await getMindmap(id)

  if (mode) {
    mindmap.mode = mode
  }

  mindmap.seo = {}

  if (title) {
    mindmap.seo.title = title;
  }
  if (description) {
    mindmap.seo.description = description;
  }
  if (image) {
    mindmap.seo.image = image;
  }

  saveMindmap(id, mindmap)
}