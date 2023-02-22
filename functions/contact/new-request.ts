export async function onRequestGet(context: any) {
  const certs = await context.env.ALIZEMANI.get("certs/inbox");
  const pub = await context.env.ALIZEMANI.get("admin");
  const response = {
    pub,
    certs,
  };
  if (response) {
    return new Response(JSON.stringify(response));
  } else {
    return new Response(JSON.stringify(""));
  }
}
