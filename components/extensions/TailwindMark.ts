import { Mark, mergeAttributes } from "@tiptap/core";

/**
 * 给 Tiptap 扩展命令类型
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tailwindMark: {
      setTw: (className: string) => ReturnType;
      unsetTw: () => ReturnType;
    };
  }
}

export const TailwindMark = Mark.create({
  name: "tw",

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[class]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTw:
        (className: string) =>
        ({ chain }) => {
          return chain().setMark("tw", { class: className }).run();
        },

      unsetTw:
        () =>
        ({ chain }) => {
          return chain().unsetMark("tw").run();
        },
    };
  },
});
