import { WebUUID } from "web-uuid";

export async function onRequest(context: any) {
  let currentLength = 0;
  const upgradeHeader = context.request.headers.get("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const webSocketPair = new WebSocketPair();
  const [client, server] = Object.values(webSocketPair);
  server.accept();
  server.addEventListener("message", async ({ data }) => {
    const id = new WebUUID();
    server.send("NEW-MESSAGE" + id);

    // await context.env.DEFAULT_KV_NAMESPACE.put(
    //   "messages/" + id,
    //   JSON.stringify(data)
    // );
  });
  setInterval(async () => {
    const query = await context.env.ALIZEMANI.list({
      // prefix: "comments/pending/",
      prefix: "comments/pending/",
    });
    const pendingComments = await query.keys.map((item: any) => item.name);
    if (currentLength === 0) {
      currentLength = pendingComments.length;
      server.send("NEW-MESSAGE-ARRAY:" + JSON.stringify(pendingComments));
    } else if (currentLength !== pendingComments.length) {
      currentLength = pendingComments.length;
      server.send("NEW-MESSAGE-ARRAY:" + JSON.stringify(pendingComments));
    }
  }, 2000);

  server.addEventListener("close", async (evt: any) => {
    console.log(evt);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
