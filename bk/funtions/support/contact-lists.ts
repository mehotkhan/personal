import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { env } = context;
  const dbKey = "supports-lists";
  const db = await env.ALIZEMANI.get(dbKey);
  if (!db) return badRequest();
  const jsonArray = await JSON.parse(db);
  const result = jsonArray.map((item: any) => {
    return {
      name: item.name,
      about: item.about,
      picture: item.picture,
      pub: item.pub,
      default: item.default ?? false,
    };
  });

  return new Response(JSON.stringify(result));
}
