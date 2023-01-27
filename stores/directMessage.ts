import { defineStore } from "pinia";

export interface IMessageState {
  pub: string | undefined;
  chatInstance: any | null;
  chatHistory: any[];
  person: any | null;
}

export const useMessage = defineStore("directMessage", {
  state: (): IMessageState => ({
    pub: undefined,
    person: null,
    chatInstance: null,
    chatHistory: [],
  }),
  actions: {
    startChat(pub: string) {
      const { $irisPublic, $irisPrivate } = useNuxtApp();

      // new
      if (!this.pub && pub) {
        this.pub = pub;
        $irisPublic(this.pub)
          .get("profile")
          .on((profile: any) => {
            this.person = profile;
          });
        this.chatInstance = $irisPrivate(this.pub);
        this.chatInstance.getMessages((msg: any, meta: any) => {
          if (!this.chatHistory.find((old) => old.time === msg.time)) {
            this.chatHistory.push({ ...msg, selfAuthored: meta.selfAuthored });
          }
        });
        this.chatHistory = [];
        console.log("initial new chat");
      } else {
        console.log("load latest chat");
      }
    },
    send(message: string) {
      this.chatInstance.send(message);
    },
  },
});
