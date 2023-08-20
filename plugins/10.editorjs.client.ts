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
import { LayoutBlockTool } from "editorjs-layout";

// import { MDImporter, MDParser } from "../libs/editorjs-markdown-parser";
const editorJSConfig = {
  readOnly: false,
  holder: "editorJs",
  minHeight: 200,
  autofocus: true,

  tools: {
    // markdownParser: MDParser,
    // markdownImporter: MDImporter,
    header: Header,
    list: List,
    delimiter: Delimiter,
    // image: SimpleImage,
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
};

const editorJS = (data: any, save: Function) => {
  return new EditorJS({
    readOnly: false,
    holder: "editorJs",
    minHeight: 200,
    autofocus: true,

    tools: {
      // markdownParser: MDParser,
      // markdownImporter: MDImporter,
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

      twoColumns: {
        class: LayoutBlockTool,
        config: {
          EditorJS,
          editorJSConfig,
          enableLayoutEditing: true,
          enableLayoutSaving: false,
          initialData: {
            itemContent: {
              1: {
                blocks: [],
              },
              2: {
                blocks: [],
              },
            },
            layout: {
              type: "container",
              id: "",
              className: "",
              style:
                "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
              children: [
                {
                  type: "item",
                  id: "",
                  className: "",
                  style: "border: 1px solid #000000; padding: 8px; ",
                  itemContentId: "1",
                },
                {
                  type: "item",
                  id: "",
                  className: "",
                  style: "border: 1px solid #000000; padding: 8px; ",
                  itemContentId: "2",
                },
              ],
            },
          },
        },
        shortcut: "CMD+2",
        toolbox: {
          icon: `
            <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
              <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
              <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
            </svg>
          `,
          title: "2 columns",
        },
      },
      ThreeColumns: {
        class: LayoutBlockTool,
        config: {
          EditorJS,
          editorJSConfig,
          enableLayoutEditing: true,
          enableLayoutSaving: false,
          initialData: {
            itemContent: {
              1: {
                blocks: [],
              },
              2: {
                blocks: [],
              },
              3: {
                blocks: [],
              },
            },
            layout: {
              type: "container",
              id: "",
              className: "",
              style:
                "border: 1px solid #000000; display: flex; justify-content: space-around; padding: 16px; ",
              children: [
                {
                  type: "item",
                  id: "",
                  className: "",
                  style: "border: 1px solid #000000; padding: 8px; ",
                  itemContentId: "1",
                },
                {
                  type: "item",
                  id: "",
                  className: "",
                  style: "border: 1px solid #000000; padding: 8px; ",
                  itemContentId: "2",
                },
                {
                  type: "item",
                  id: "",
                  className: "",
                  style: "border: 1px solid #000000; padding: 8px; ",
                  itemContentId: "2",
                },
              ],
            },
          },
        },
        shortcut: "CMD+3",
        toolbox: {
          icon: `
            <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 512 512'>
              <rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/>
              <path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
            </svg>
          `,
          title: "3 columns",
        },
      },
    },
    onChange: (api, event: any) => {
      api.saver.save().then(async (data: any) => {
        save(data);
      });
    },
    data,
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
