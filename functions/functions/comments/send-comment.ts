import { ok, badRequest } from "@worker-tools/response-creators";
import { WebUUID } from "web-uuid";

export async function onRequestPost(context: any) {
  // ex path : comments/pending/notes/articleTitle/year/month/day/hour/min/seconds/UUID
  const { request, env } = context;
  const body = await request.json();
  const incomingHeader = new Map(request.headers);
  const userPub = incomingHeader.get("ownerpub");
  if (
    typeof body.comment === undefined &&
    typeof body.date === undefined &&
    typeof body.path === undefined
  )
    return badRequest();
  const date = new Date();
  const dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/${date.getHours()}/${date.getMinutes()}/`;
  const commentId = new WebUUID();
  const dbKey = "comments/pending/" + dateFormat + body.path + "/" + commentId;
  console.log(dbKey);
  const commentBody = {
    comment: body.comment,
    date: body.date,
    user: userPub,
    path: body.path,
    commentId,
  };
  await env.ALIZEMANI.put(dbKey, JSON.stringify(commentBody));
  return ok();
}
