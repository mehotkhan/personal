import { WebUUID } from "web-uuid";

const exData = {
  time: 1692536739790,
  blocks: [
    {
      id: "bOra4Pll7F",
      type: "header",
      data: {
        text: "به پنل اولیه خوش آمدید :)",
        level: 2,
      },
    },
    {
      id: "RvT_q8aWdI",
      type: "paragraph",
      data: {
        text: "همه چیز در حال تست و اماده سازی است .",
      },
    },
  ],
  version: "2.27.2",
};
const editorValues = ref<null | any>();
export default () => {
  const { profile } = useUser();
  onMounted(() => {
    if (!editorValues.value) {
      editorValues.value = exData;
    }
  });
  const saveNotes = async (status: "draft" | "publish") => {
    const data = {
      id: new WebUUID().toString(),
      title: "test title",
      created_at: Date.now(),
      updated_at: Date.now(),
      description: "test descriptions",
      poster: "",
      body: JSON.parse(JSON.stringify(editorValues.value)),
      author: profile.value.pub,
      status,
    };
    DexieDB.dashboardNotes.put(data);
  };
  const allNotes = useLiveQuery<any[]>(
    async () =>
      await DexieDB.dashboardNotes
        .orderBy("created_at")
        .limit(100)
        .reverse()
        .toArray(),
    [],
  );
  const loadNotes = async (id: string) => {
    const query = await DexieDB.dashboardNotes.get(id);
    editorValues.value = query.body;
  };
  const updateNotes = async (id: string, status: "draft" | "publish") => {
    await DexieDB.dashboardNotes
      .where("id")
      .equals(id)
      .modify({
        updated_at: Date.now(),
        title: "update title",
        description: "updated descriptions",
        body: JSON.parse(JSON.stringify(editorValues.value)),
        status,
        poster: "",
      });
  };
  return { saveNotes, editorValues, allNotes, loadNotes, updateNotes };
};
