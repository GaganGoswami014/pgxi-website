import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import ImageExt from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import DOMPurify from "dompurify";
import EditorToolbar from "./editor/EditorToolbar";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onImageUpload }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4, 5, 6] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ImageExt.configure({ inline: false, allowBase64: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder: "Start writing your blog post…" }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const raw = editor.getHTML();
      const clean = DOMPurify.sanitize(raw, {
        ALLOWED_TAGS: [
          "p", "br", "strong", "em", "u", "s", "h2", "h3", "h4", "h5", "h6",
          "ul", "ol", "li", "blockquote", "hr", "img", "a", "mark", "span", "div", "code",
        ],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "data-color", "target", "rel"],
      });
      onChange(clean);
    },
  });

  if (!editor) return null;

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (onImageUpload) {
        const url = await onImageUpload(file);
        const alt = prompt("Alt text for this image:") ?? "";
        editor.chain().focus().setImage({ src: url, alt }).run();
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          editor.chain().focus().setImage({ src: reader.result as string }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background">
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent
        editor={editor}
        className="min-h-[400px] text-sm text-foreground focus-within:ring-0"
      />
    </div>
  );
};

export default RichTextEditor;
