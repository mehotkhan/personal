export async function onRequest(context) {
  const response = {
    pub: await context.env.ALIZEMANI.get("admin"),
    certs: await context.env.ALIZEMANI.get("certs/inbox"),
  };
  if (response) {
    return new Response(JSON.stringify(response));
  } else {
    return new Response(JSON.stringify(""));
  }
}
