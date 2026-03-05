import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import BlogPreview from "@/components/admin/editor/BlogPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Upload, X, Save, Eye, PenLine, Settings2 } from "lucide-react";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

interface BlogForm {
  title: string;
  slug: string;
  category: string;
  featured_image: string;
  content: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
}

const INITIAL_FORM: BlogForm = {
  title: "",
  slug: "",
  category: "",
  featured_image: "",
  content: "",
  meta_title: "",
  meta_description: "",
  is_published: false,
};

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState<BlogForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("editor");

  useEffect(() => {
    if (!isEdit) return;
    supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          toast({ title: "Not found", variant: "destructive" });
          navigate("/admin/blog");
          return;
        }
        setForm({
          title: data.title,
          slug: data.slug,
          category: data.category ?? "",
          featured_image: data.featured_image ?? "",
          content: data.content ?? "",
          meta_title: data.meta_title ?? "",
          meta_description: data.meta_description ?? "",
          is_published: data.is_published,
        });
        setLoading(false);
      });
  }, [id, isEdit, navigate, toast]);

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: slugManual ? f.slug : generateSlug(title),
    }));
  };

  const handleFeaturedImageUpload = async (file: File) => {
    setImageUploading(true);
    const ext = file.name.split(".").pop();
    const path = `featured/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setImageUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setForm((f) => ({ ...f, featured_image: data.publicUrl }));
    setImageUploading(false);
  };

  const handleEditorImageUpload = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `content/${Date.now()}.${ext}`;
    await supabase.storage.from("blog-images").upload(path, file);
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setSaving(true);

    const payload = {
      ...form,
      author_id: user?.id,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("blogs").update(payload).eq("id", id!));
    } else {
      ({ error } = await supabase.from("blogs").insert([payload]));
    }

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: isEdit ? "Blog updated!" : "Blog created!",
        description: form.is_published ? "Post is now live." : "Saved as draft.",
      });
      navigate("/admin/blog");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminLayout title={isEdit ? "Edit Blog" : "New Blog"}>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEdit ? "Edit Blog Post" : "New Blog Post"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/blog")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={form.is_published}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
              />
              <Label htmlFor="published" className="text-sm cursor-pointer">
                {form.is_published ? (
                  <span className="text-primary font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Published
                  </span>
                ) : (
                  <span className="text-muted-foreground">Draft</span>
                )}
              </Label>
            </div>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving…" : "Save Post"}
            </Button>
          </div>
        </div>

        {/* Title + Category row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-3 space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Blog Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter your blog post title…"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-lg font-semibold h-12"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Category</Label>
            <Input
              placeholder="e.g. Branding, Marketing"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="h-12"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          {form.featured_image ? (
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img
                src={form.featured_image}
                alt="Featured"
                className="w-full h-48 lg:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, featured_image: "" }))}
                className="absolute top-3 right-3 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-3 text-xs text-white/80 font-medium">Featured Image</span>
            </div>
          ) : (
            <label className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
              {imageUploading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">Upload Featured Image</p>
                <p className="text-xs text-muted-foreground">Click to browse or drag and drop</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFeaturedImageUpload(file);
                }}
              />
            </label>
          )}
        </div>

        {/* Main content area with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="editor" className="gap-1.5">
              <PenLine className="w-3.5 h-3.5" /> Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5">
              <Settings2 className="w-3.5 h-3.5" /> SEO & Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0">
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
              onImageUpload={handleEditorImageUpload}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <BlogPreview
              title={form.title}
              category={form.category}
              featuredImage={form.featured_image}
              content={form.content}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* URL Slug */}
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">URL Slug</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input
                    value={form.slug}
                    onChange={(e) => {
                      setSlugManual(true);
                      setForm((f) => ({ ...f, slug: e.target.value }));
                    }}
                    placeholder="auto-generated-slug"
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">Auto-generated from title. Edit to customise.</p>
                </CardContent>
              </Card>

              {/* SEO */}
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meta Title</Label>
                    <Input
                      placeholder="SEO meta title…"
                      value={form.meta_title}
                      onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground">{form.meta_title.length}/60</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meta Description</Label>
                    <Textarea
                      placeholder="SEO meta description…"
                      value={form.meta_description}
                      onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground">{form.meta_description.length}/160</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;
