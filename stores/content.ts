import { defineStore } from "pinia";

export interface IContentState {
  currentSection: string;
}

export const useContent = defineStore("contentManage", {
  state: (): IContentState => ({
    currentSection: "",
  }),
  actions: {
    setSection(section: string | null) {
      if (section) {
        this.currentSection = section;
      }
    },
  },
});
