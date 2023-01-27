import { defineStore } from "pinia";

export interface IMessageState {
  pub: string | undefined;
  chatHistory: any[];
  person: any | null;
  chatInstance: any[];
}

export const useMessage = defineStore("directMessage", {
  state: (): IMessageState => ({
    pub: undefined,
    person: null,
    chatHistory: [],
    chatInstance: [{}],
  }),
  actions: {
    startChat(pub: string) {
      const { $irisPublic, $irisPrivate } = useNuxtApp();
      const chatInstance = this.chatInstance.find((chat) => chat.id === pub);
      console.log("chatInstance", chatInstance);
      if (!chatInstance) {
        this.pub = pub;
        $irisPublic(this.pub)
          .get("profile")
          .on((profile: any) => {
            this.person = profile;
          });

        const currentInstance = {
          id: pub,
          instance: $irisPrivate(this.pub),
        };
        currentInstance.instance.getMessages((msg: any, meta: any) => {
          if (!this.chatHistory.find((old) => old.time === msg.time)) {
            this.chatHistory.push({
              ...msg,
              selfAuthored: meta.selfAuthored,
            });
          }
        });
        this.chatInstance.push(currentInstance);
        console.log("initial new chat");
      } else {
        this.pub = pub;
        this.chatHistory = [];
        console.log(this.chatInstance);
        chatInstance.instance.getMessages((msg: any, meta: any) => {
          if (!this.chatHistory.find((old) => old.time === msg.time)) {
            this.chatHistory.push({
              ...msg,
              selfAuthored: meta.selfAuthored,
            });
          }
        });
        console.log("load latest chat");
      }
    },

    send(message: string) {
      const chatInstance = this.chatInstance.find(
        (chat) => chat.id === this.pub
      );
      if (chatInstance) {
        chatInstance.instance.send(message);
      }
    },
  },
});
