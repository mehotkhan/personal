import { useStorage } from "@vueuse/core";

const currentTicket: any = useStorage("support-current-ticket", {});

const messageLimit = ref(200);
const archiveLimit = ref(10);

export default () => {
  const { $publishSupportTicket, $dexieDb } = useNuxtApp();
  const { getSince, streamSorting } = useStream();
  const { profile } = useUser();

  const openSupport = async (ticket: any) => {
    currentTicket.value = ticket;
  };

  const sendTicket = async (message: string) => {
    if (!message.length) return;
    await $publishSupportTicket(message, profile.value, currentTicket.value);
  };

  const changeTicketStatus = async (message: string, status: string) => {
    if (!message.length && !status.length) return;
    currentTicket.value.status = status;
    await $publishSupportTicket(message, profile.value, currentTicket.value);
  };

  const supportTimeLine = useLiveQuery<any[]>(async () => {
    const query = $dexieDb?.supportMessages
      .orderBy("created_at")
      .filter((message: any) => message.ticketId === currentTicket.value.id)
      .limit(messageLimit.value);

    return streamSorting.value.filter === "asc"
      ? await query.toArray()
      : await query?.reverse().toArray();
  }, [archiveLimit, getSince, streamSorting, currentTicket]);

  const supportArchive = useLiveQuery<any[]>(async () => {
    const query = $dexieDb?.supportArchive
      .orderBy("created_at")
      .limit(archiveLimit.value);

    return streamSorting.value.filter === "asc"
      ? await query?.toArray()
      : await query?.reverse().toArray();
  }, [archiveLimit, getSince, streamSorting]);

  onUnmounted(() => {
    console.log("unmounted");
  });
  return {
    openSupport,
    sendTicket,
    supportTimeLine,
    supportArchive,
    currentTicket,
    changeTicketStatus,
  };
};
