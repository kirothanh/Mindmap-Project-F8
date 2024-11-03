import { deleteMindmap } from "@/services/mindmapService";
import React from "react";
import Redirect from "../../Items/Redirect";
import { revalidatePath } from "next/cache";

export default async function DeletePage({ params }) {
  const { id } = params;
  await deleteMindmap(id);
  revalidatePath('/my-mindmap');
  return <Redirect />;
}
