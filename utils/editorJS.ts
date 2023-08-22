import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Checklist from "@editorjs/checklist";
import SimpleImage from "simple-image-editorjs";
import MermaidTool from "editorjs-mermaid";
import Table from "@editorjs/table";

export const editorJS = (data: any, save: Function) => {
  return new EditorJS({
    readOnly: false,
    holder: "editorJs",
    minHeight: 200,
    autofocus: true,

    tools: {
      header: Header,
      list: List,
      delimiter: Delimiter,
      image: SimpleImage,
      mermaid: MermaidTool,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      alert: {
        class: Alert,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+A",
        config: {
          defaultType: "primary",
          messagePlaceholder: "Enter something",
        },
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+W",
        config: {
          titlePlaceholder: "Title",
          messagePlaceholder: "Message",
        },
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
        config: {
          quotePlaceholder: "Enter a quote",
          captionPlaceholder: "Quote's author",
        },
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    },
    onChange: (api, event: any) => {
      api.saver.save().then(async (data: any) => {
        save(data);
      });
    },
    data,
    i18n: {
      direction: "rtl",
    },
  });
};
