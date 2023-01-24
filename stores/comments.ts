import { defineStore } from "pinia";
const appConfig = useAppConfig();

export interface ICommentState {
  commentHistory: any[];
}

export const useComment = defineStore("commentStream", {
  state: (): ICommentState => ({
    commentHistory: [],
  }),
  actions: {
    loadComments(path: string) {
      const { $irisGroup } = useNuxtApp();
      const commentKey = "comments." + appConfig.name + path;
      const commentPath = commentKey.replace(/-|\/|\./gi, ".");
      this.commentHistory = [];
      $irisGroup("everyone").map(commentPath, (msg: any, from: any) => {
        if (!this.commentHistory.find((old) => old.from === from) && msg) {
          this.commentHistory.push({ ...msg, from });
        }
      });
    },

    send(comment: string, path: string) {
      const { $irisPublic, $irisSession } = useNuxtApp();
      const sender = $irisSession.getKey();
      const commentKey = "comments." + appConfig.name + path;
      const commentPath = commentKey.replace(/-|\/|\./gi, ".");
      $irisPublic()
        .get(commentPath)
        .get(new Date().toISOString())
        .put({ text: comment, sender: sender.pub });
    },
  },
});
