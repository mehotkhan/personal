export async function onRequest(context) {
  const body = await context.request.json()
  const { pub, path } = body;
  const dbKey = 'comments' + path.replace(/-|\/|\./gi, ".");
  const joinDb = await context.env.ALIZEMANI.get(dbKey);
  if (joinDb) {
    const joinArray = await JSON.parse(joinDb)
    await joinArray.push(pub)
    await context.env.ALIZEMANI.put(dbKey, JSON.stringify([...new Set(joinArray)]));
    return new Response(true);
  }
  else {
    const joinArray = [pub]
    await context.env.ALIZEMANI.put(dbKey, JSON.stringify(joinArray));
    return new Response(true);
  }

}

