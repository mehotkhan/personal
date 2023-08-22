import { useStorage } from "@vueuse/core";
import { WebUUID } from "web-uuid";

const modalMode = useStorage("support-help-desk-mode", "home");
const contactLists = useStorage("support-contact-lists", [{}]);
const qaLists = useStorage("support-qa-lists", [{}]);
const defaultContact: any = useStorage("support-default-contact", {});
const currentTicket: any = useStorage("support-current-ticket", {});
const expanded = useStorage("support-helpDesk-expanded", false);
const firstVisit = useStorage("support-first-visit", true);

const messageLimit = ref(200);
const archiveLimit = ref(20);
const modalBoxIsOpen = ref(false);

const sectionTitle = (mode: string) => {
  const map = [
    {
      mode: "home",
      title: "خانه",
    },
    {
      mode: "chats",
      title: "پیام ها",
    },
    {
      mode: "social",
      title: "افراد",
    },
  ];
  return map.find((item: any) => item.mode === mode)?.title;
};
export default () => {
  const { $publishSupportTicket, $dexieDb } = useNuxtApp();
  const { getSince, streamSorting } = useStream();
  const { profile } = useUser();

  const welcomeMessage = async () => {
    if (firstVisit.value) {
      setTimeout(() => {
        modalBoxIsOpen.value = true;
        firstVisit.value = false;
      }, 7000);
    }
    // first visit time !!!
    /*
      basic flow of supporting systems
      */
    // 1- if first visit time ?
    // 2- get page route
    // 2-1 : there is some other strategy for other page ?
    // 3- create welcome message
    // 4- get moderator list form KV
    // 5- find a way to select random manager
    // 6- create first message and send response to receiver
    // 7- message must have some ta for filtering in moderator ui
    // 8- message must have some filter and metadata to better managing like : open ,close and ...
    // if (firstVisit.value && profile.value.pub !== testReceiver) {
    //   const startTimer = 10000 // 10 seconds
    //   // get from KV
    //   const newTicket = {
    //     message: `پیام جدید از سمت ${profile.value.displayName}`,
    //     receiver: testReceiver,
    //     subjects: 'welcome',
    //   }
    //   setTimeout(async () => {
    //     await createNew(newTicket)
    //   }, startTimer)
    //   firstVisit.value = false
    // }
  };

  const getContactLists = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "support/contact-lists", {
        method: "GET",
      });
      const response: any[] = await JSON.parse(api);
      contactLists.value = response?.filter((item: any) => !item.default);
      defaultContact.value = response?.find((item: any) => item.default);
    } catch (error) {
      // contactLists.value = []
    }
  };

  const createNewDefault = async () => {
    const id = String(new WebUUID());
    const newTicket = {
      id,
      topic: defaultContact.value.name,
      status: "new",
      owner: profile.value.pub,
      operator: defaultContact.value.pub,
    };
    currentTicket.value = newTicket;
    changeView("chat");
  };

  const createNew = async (contact: any) => {
    const id = String(new WebUUID());
    const newTicket = {
      id,
      topic: contact.name,
      status: "new",
      owner: profile.value.pub,
      operator: contact.pub,
    };
    currentTicket.value = newTicket;
    changeView("chat");
  };

  const openSupportTicket = async (ticket: any) => {
    currentTicket.value = ticket;
    changeView("chat");
  };

  const sendTicket = async (message: string) => {
    if (!message.length) return;
    await $publishSupportTicket(message, profile.value, currentTicket.value);
  };

  const changeView = (mode: "home" | "chats" | "social" | "chat") => {
    modalMode.value = mode;
    if (mode === "social") {
      expanded.value = true;
    } else {
      expanded.value = false;
    }
  };

  const viewTitle = computed(() => sectionTitle(modalMode.value));

  const supportTimeLine = useLiveQuery<any[]>(async () => {
    const query = $dexieDb?.supportMessages
      .orderBy("created_at")
      .filter(
        (message: any) =>
          message.ticketId === currentTicket.value.id &&
          message.created_at >= getSince.value,
      )
      .limit(messageLimit.value);

    return streamSorting.value.filter === "asc"
      ? await query.toArray()
      : await query?.reverse().toArray();
  }, [archiveLimit, getSince, streamSorting, currentTicket]);

  const supportArchive = useLiveQuery<any[]>(async () => {
    const query = $dexieDb?.supportArchive
      .orderBy("created_at")
      .filter((message: any) => message.created_at >= getSince.value)
      .limit(archiveLimit.value);

    return streamSorting.value.filter === "asc"
      ? await query?.toArray()
      : await query?.reverse().toArray();
  }, [archiveLimit, getSince, streamSorting]);

  const expandView = () => {
    expanded.value = !expanded.value;
  };
  const getQaLists = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "manage/qa-lists", {
        method: "GET",
      });
      const response: string[] = await JSON.parse(api);
      qaLists.value = response;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    welcomeMessage,
    changeView,
    modalMode,
    modalBoxIsOpen,
    viewTitle,
    openSupportTicket,
    getContactLists,
    contactLists,
    defaultContact,
    createNewDefault,
    sendTicket,
    supportTimeLine,
    supportArchive,
    createNew,
    expanded,
    expandView,
    currentTicket,
    getQaLists,
    qaLists,
  };
};
