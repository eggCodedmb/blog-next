// 文本节点
interface TextNode {
  type: "text";
  from: number;
  to: number;
  text: string;
}

// heading 节点 attrs
interface HeadingAttrs {
  id: string;
  "data-toc-id": string;
  level: number;
}

// heading 节点
interface HeadingNode {
  type: "heading";
  from: number;
  to: number;
  attrs: HeadingAttrs;
  content: TextNode[]; // heading 里一般只包含文本
}

// paragraph 节点
interface ParagraphNode {
  type: "paragraph";
  from: number;
  to: number;
  content: TextNode[];
}

// 通用节点类型
type DocContentNode = HeadingNode | ParagraphNode | TextNode;

// 顶层文档接口
export interface ProseMirrorDoc {
  type: "doc";
  from: number;
  to: number;
  content: DocContentNode[];
}
