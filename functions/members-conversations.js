export async function onRequest(context) {
  const body = await context.request.json();
  const { path } = body;
  const dbKey = "comments" + path.replace(/-|\/|\./gi, ".");
  const joinDb = await context.env.ALIZEMANI.get(dbKey);

  if (joinDb) {
    return new Response(joinDb);
  } else {
    return new Response(JSON.stringify([]));
  }
}
