import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, Globe, Instagram, Facebook, Twitter, Linkedin, Type } from "lucide-react";

interface Settings {
  hero_heading: string;
  hero_subheading: string;
  cta_text: string;
  footer_text: string;
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
}

const DEFAULT: Settings = {
  hero_heading: "",
  hero_subheading: "",
  cta_text: "",
  footer_text: "",
  instagram_url: "",
  facebook_url: "",
  twitter_url: "",
  linkedin_url: "",
};

const SiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          const map = Object.fromEntries(data.map((r) => [r.key, r.value ?? ""]));
          setSettings((s) => ({ ...s, ...map }));
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_settings").upsert(upserts, { onConflict: "key" });

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Settings saved!", description: "Changes are now live on the website." });
    }
    setSaving(false);
  };

  const set = (key: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSettings((s) => ({ ...s, [key]: e.target.value }));

  if (loading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Website Settings</h2>
            <p className="text-sm text-muted-foreground">Changes save directly to the live site</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Hero section */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                Hero Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Hero Heading</Label>
                <Input
                  value={settings.hero_heading}
                  onChange={set("hero_heading")}
                  placeholder="We Build Brands That Mean Business"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Hero Subheading</Label>
                <Input
                  value={settings.hero_subheading}
                  onChange={set("hero_subheading")}
                  placeholder="PG-XI Creatives — Strategy. Design. Growth."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">CTA Button Text</Label>
                <Input
                  value={settings.cta_text}
                  onChange={set("cta_text")}
                  placeholder="Start Your Project"
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Footer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Footer Text</Label>
                <Input
                  value={settings.footer_text}
                  onChange={set("footer_text")}
                  placeholder="© 2024 PG-XI Creatives. All rights reserved."
                />
              </div>
            </CardContent>
          </Card>

          {/* Social links */}
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "instagram_url" as keyof Settings, label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/pgxi" },
                { key: "facebook_url" as keyof Settings, label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/pgxi" },
                { key: "twitter_url" as keyof Settings, label: "Twitter / X", icon: Twitter, placeholder: "https://twitter.com/pgxi" },
                { key: "linkedin_url" as keyof Settings, label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/pgxi" },
              ].map(({ key, label, icon: Icon, placeholder }) => (
                <div key={key} className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    {label}
                  </Label>
                  <Input
                    value={settings[key]}
                    onChange={set(key)}
                    placeholder={placeholder}
                    type="url"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Save button (bottom) */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-2 px-8">
            {saving ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving…" : "Save All Changes"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteSettings;
