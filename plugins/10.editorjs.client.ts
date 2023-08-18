import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const editorJS = (data: any, save: Function) => {
  return new EditorJS({
    holder: "editorJs",
    minHeight: 0,
    tools: {
      header: Header,
      list: List,
    },
    onChange: (api, event: any) => {
      api.saver.save().then(async (data: any) => {
        save(data);
      });
    },
    data,
    logLevel: "ERROR",
    i18n: {
      /**
       * Text direction
       */
      direction: "rtl",
    },
  });
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      editorJS,
    },
  };
});
