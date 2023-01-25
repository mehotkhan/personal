import { defineStore } from 'pinia'

export interface IMessageState {
  pub: string | undefined
  chatInstance: any | null
  chatHistory: any[]
  person: any | null
}

export const useMessage = defineStore('directMessage', {
  state: (): IMessageState => ({
    pub: undefined,
    person: null,
    chatInstance: null,
    chatHistory: [],
  }),
  actions: {
    startChat(pub: string | undefined) {
      if (pub) {
        this.pub = pub
      } else {
        this.pub = undefined
        this.person = null
        // console.log(this.chatInstance)
      }
      this.chatHistory = []
      // this.chatInstance = null
    },
    loadChat() {
      const { $irisPrivate } = useNuxtApp()
      this.chatInstance = $irisPrivate(this.pub)
      this.chatInstance.getMessages((msg: any, meta: any) => {
        if (!this.chatHistory.find((old) => old.time === msg.time)) {
          this.chatHistory.push({ ...msg, selfAuthored: meta.selfAuthored })
        }
      })
    },
    loadPerson() {
      const { $irisPublic } = useNuxtApp()
      if (this.pub) {
        $irisPublic(this.pub)
          .get('profile')
          .on((profile: any) => {
            this.person = profile
          })
      }
    },
    send(message: string) {
      this.chatInstance.send(message)
    },
  },
})
