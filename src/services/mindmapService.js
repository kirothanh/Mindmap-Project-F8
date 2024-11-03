import { getSession } from "@auth0/nextjs-auth0";
import { revalidatePath } from "next/cache";

export async function getMindmapList(checkUser = true) {
  const response = await fetch(`${process.env.API_URL}/mindmaps`, {
    cache: 'no-store',
  });
  let mindmapData = await response.json();

  if (checkUser) {
    const { user } = await getSession();
    const userId = user?.sub;
    if (userId) {
      mindmapData = mindmapData?.filter((item) => item.userId === userId);
    }
  }

  return mindmapData;
}

export async function deleteMindmap(id) {
  const response = await fetch(`${process.env.API_URL}/mindmaps/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    await revalidatePath('/my-mindmap');
  }
  return response.ok;
}

export async function getMindmap(id, checkUser = true) {
  const response = await fetch(`${process.env.API_URL}/mindmaps/${id}`, {
    cache: 'no-store',
  });
  const item = await response.json();

  if (checkUser) {
    const session = await getSession();
    if (session) {
      const { user } = session
      const userId = user.sub
      return item && userId === item.userId ? item : "null"
    }
  }

  return item
}

export async function saveMindmap(id, data = {}) {
  const response = await fetch(`${process.env.API_URL}/mindmaps/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.ok;
}

