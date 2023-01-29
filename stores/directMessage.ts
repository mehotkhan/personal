import { defineStore } from "pinia";

export interface IMessageState {
  pub: string | undefined;
  chatHistory: any[];
  person: any | null;
}

export const useMessage = defineStore("directMessage", {
  state: (): IMessageState => ({
    pub: undefined,
    person: null,
    chatHistory: [],
  }),
  actions: {
    startChat(pub: string) {
      const { $irisPublic, $irisPrivate } = useNuxtApp();
      // if (this.pub !== pub) {
      this.pub = pub;

      $irisPublic(this.pub)
        .get("profile")
        .on((profile: any) => {
          this.person = profile;
        });

      // $irisPrivate(this.pub).getMessages((msg: any, meta: any) => {
      //   if (!this.chatHistory.find((old) => old.time === msg.time)) {
      //     console.log(meta, msg);
      //     this.chatHistory.push({
      //       ...msg,
      //       selfAuthored: meta.selfAuthored,
      //     });
      //   }
      // });
      // console.log("initial new chat");
      // } else {
      //   this.pub = pub;
      //   this.chatHistory = [];
      //   $irisPublic(this.pub)
      //     .get("profile")
      //     .on((profile: any) => {
      //       this.person = profile;
      //     });

      //   $irisPrivate(this.pub).getMessages((msg: any, meta: any) => {
      //     if (!this.chatHistory.find((old) => old.time === msg.time)) {
      //       console.log(meta, msg);
      //       this.chatHistory.push({
      //         ...msg,
      //         selfAuthored: meta.selfAuthored,
      //       });
      //     }
      //   });
      //   console.log("initial new chat");
      // }
    },

    send(message: string) {
      const { $irisPrivate } = useNuxtApp();

      $irisPrivate(this.pub).send(message);
    },
  },
});
