import { Editor } from "@tiptap/react";
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Minus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Heading2, Heading3, Heading4,
  Image as ImageIcon, Link as LinkIcon,
  Undo, Redo, RemoveFormatting, Code,
  AlertCircle, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: () => void;
}

const TEXT_COLORS = [
  { label: "Default", value: "" },
  { label: "Black", value: "#1a1a1a" },
  { label: "Dark Gray", value: "#555555" },
  { label: "Gold", value: "#C8A23A" },
  { label: "Red", value: "#DC2626" },
  { label: "Green", value: "#16A34A" },
  { label: "Blue", value: "#2563EB" },
  { label: "Purple", value: "#9333EA" },
  { label: "Orange", value: "#EA580C" },
];

const HIGHLIGHT_COLORS = [
  { label: "None", value: "" },
  { label: "Yellow", value: "#FEF9C3" },
  { label: "Gold", value: "#FFF3CC" },
  { label: "Green", value: "#DCFCE7" },
  { label: "Blue", value: "#DBEAFE" },
  { label: "Purple", value: "#F3E8FF" },
  { label: "Pink", value: "#FCE7F3" },
  { label: "Gray", value: "#F0F0F0" },
];

const ToolbarButton = ({
  onClick,
  active,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "p-1.5 rounded transition-colors",
          active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs">{title}</TooltipContent>
  </Tooltip>
);

const Divider = () => <div className="w-px h-6 bg-border mx-1" />;

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onImageUpload }) => {
  const insertLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = prompt("Enter URL:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const insertCallout = (type: "info" | "warning") => {
    const cls = type === "info" ? "callout-info" : "callout-warning";
    editor
      .chain()
      .focus()
      .insertContent(`<div class="${cls}"><p>Your ${type} message here…</p></div>`)
      .run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-muted/30">
      {/* Undo / Redo */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)" disabled={!editor.can().undo()}>
        <Undo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)" disabled={!editor.can().redo()}>
        <Redo className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4">
        <Heading4 className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Inline formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)">
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)">
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)">
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">
        <Code className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Text Color */}
      <Select
        value={editor.getAttributes("textStyle").color ?? ""}
        onValueChange={(val) => {
          if (val === "") {
            editor.chain().focus().unsetColor().run();
          } else {
            editor.chain().focus().setColor(val).run();
          }
        }}
      >
        <SelectTrigger className="w-[100px] h-7 text-xs border-border">
          <SelectValue placeholder="Text Color" />
        </SelectTrigger>
        <SelectContent>
          {TEXT_COLORS.map(({ label, value }) => (
            <SelectItem key={label} value={value || "default"}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: value || "currentColor" }}
                />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Highlight */}
      <Select
        value=""
        onValueChange={(val) => {
          if (val === "" || val === "none") {
            editor.chain().focus().unsetHighlight().run();
          } else {
            editor.chain().focus().setHighlight({ color: val }).run();
          }
        }}
      >
        <SelectTrigger className="w-[100px] h-7 text-xs border-border">
          <SelectValue placeholder="Highlight" />
        </SelectTrigger>
        <SelectContent>
          {HIGHLIGHT_COLORS.map(({ label, value }) => (
            <SelectItem key={label} value={value || "none"}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded border border-border"
                  style={{ backgroundColor: value || "transparent" }}
                />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Divider />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">
        <AlignJustify className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Blocks */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={insertLink} active={editor.isActive("link")} title="Insert Link">
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={onImageUpload} title="Insert Image">
        <ImageIcon className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      {/* Callouts */}
      <ToolbarButton onClick={() => insertCallout("info")} title="Info Callout">
        <AlertCircle className="w-4 h-4 text-blue-500" />
      </ToolbarButton>
      <ToolbarButton onClick={() => insertCallout("warning")} title="Warning Callout">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
      </ToolbarButton>

      <Divider />

      {/* Clear formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
        <RemoveFormatting className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
