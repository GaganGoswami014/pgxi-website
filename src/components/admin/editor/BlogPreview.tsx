import DOMPurify from "dompurify";

interface BlogPreviewProps {
  title: string;
  category: string;
  featuredImage: string;
  content: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  category,
  featuredImage,
  content,
}) => {
  const cleanHtml = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "hr", "img", "a", "mark", "span", "div", "code",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "target", "rel"],
  });

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Preview header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">
          Live Preview
        </span>
      </div>

      {/* Preview body */}
      <div className="p-6 max-h-[calc(100vh-280px)] overflow-y-auto">
        {/* Category badge */}
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
            {category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
          {title || (
            <span className="text-muted-foreground/40 italic">Untitled Post</span>
          )}
        </h1>

        {/* Featured image */}
        {featuredImage && (
          <div className="mb-6 rounded-lg overflow-hidden border border-border">
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Content */}
        {content ? (
          <article
            className="ProseMirror prose-preview"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        ) : (
          <p className="text-muted-foreground/40 italic text-sm">
            Start writing to see the preview…
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPreview;
