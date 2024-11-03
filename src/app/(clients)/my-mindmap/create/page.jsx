import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import Redirect from '../Items/Redirect';
import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';

export default async function CreatePage() {
  const id = uuidv4();
  const createdAt = moment().format();
  const name = "Mindmap không có tên";
  const { user } = await getSession();
  const userId = user?.sub;

  if (!userId) {
    return <h3>Error</h3>
  }

  const newMindmap = {
    id,
    name,
    userId,
    createdAt
  }

  const response = await fetch(`${process.env.API_URL}/mindmaps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMindmap)
  })

  if (!response.ok) {
    throw new Error("Error when post mindmap")
  }

  revalidatePath('/my-mindmap');
  return <Redirect id={id} />
}
