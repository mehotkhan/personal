import { WebUUID } from "web-uuid";

export async function onRequest(context: any) {
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
  // setInterval(() => {
  //   server.send("hi");
  // }, 1000);

  server.addEventListener("close", async (evt: any) => {
    console.log(evt);
  });

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
