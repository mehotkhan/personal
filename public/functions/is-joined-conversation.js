export async function onRequest(context) {
  const body = await context.request.json()
  const { pub, path } = body;
  const dbKey = 'comments' + path.replace(/-|\/|\./gi, ".");

  const joinDb = await context.env.ALIZEMANI.get(dbKey);
  if (joinDb) {
    const joinArray = JSON.parse(joinDb)
    if (joinArray.some(item => item === pub)) {
      return new Response(true);
    } else {
      return new Response(false);
    }
  }
  else {
    return new Response(false);
  }
}

