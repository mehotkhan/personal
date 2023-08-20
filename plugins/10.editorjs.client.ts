import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { MDImporter, MDParser } from "../libs/editorjs-markdown-parser";

const editorJS = (data: any, save: Function) => {
  return new EditorJS({
    holder: "editorJs",
    minHeight: 200,
    autofocus: true,

    tools: {
      markdownParser: MDParser,

      markdownImporter: MDImporter,
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
