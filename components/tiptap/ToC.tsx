import React, { useEffect, useState } from "react";
import { TextSelection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";
import type { ProseMirrorDoc } from "@/types/docs";

interface ToCItemType {
  id: string;
  textContent: string;
  level: number;
  isActive: boolean;
  isScrolledOver: boolean;
  itemIndex: number;
}

interface ToCItemProps {
  item: ToCItemType;
  onItemClick: (e: React.MouseEvent, id: string) => void;
}

const ToCItem = ({ item, onItemClick }: ToCItemProps) => {
  return (
    <div
      className={`toc-item ${item.isActive && !item.isScrolledOver ? "is-active" : ""} ${
        item.isScrolledOver ? "is-scrolled-over" : ""
      }`}
      style={{ "--level": item.level } as React.CSSProperties}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        data-item-index={item.itemIndex}
      >
        {item.textContent}
      </a>
    </div>
  );
};

const ToCEmptyState = () => {
  return (
    <div className="toc-empty-state">
      <p>暂无标题</p>
    </div>
  );
};

interface ToCProps {
  items: ProseMirrorDoc[];
  editor: Editor;
}

export const ToC = ({ items = [], editor }: ToCProps) => {
  const [activeId, setActiveId] = useState<string>("");

  const onItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!editor) return;

    const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
    if (!element) return;

    const pos = editor.view.posAtDOM(element as HTMLElement, 0);

    // 设置选中
    const tr = editor.view.state.tr;
    tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
    editor.view.dispatch(tr);
    editor.view.focus();

    // 更新 URL
    history.pushState(null, "", `#${id}`);

    // 平滑滚动
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });

    setActiveId(id);
  };

  // 高亮滚动经过的标题
  useEffect(() => {
    if (!editor) return;

    const handleScroll = () => {
      const tocIds = items.map((item) => item.id);
      for (const id of tocIds) {
        const el = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [editor, items]);

  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  return (
    <div className="toc-container">
      {items.map((item) => (
        <ToCItem
          key={item.id}
          item={{
            ...item,
            isActive: item.id === activeId,
            isScrolledOver: false,
          }}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};
