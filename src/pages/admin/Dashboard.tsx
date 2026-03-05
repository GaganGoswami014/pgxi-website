import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, MessageSquare, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  totalLeads: number;
  recentMessages: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalLeads: 0,
    recentMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [blogsRes, leadsRes, recentRes] = await Promise.all([
        supabase.from("blogs").select("id, is_published"),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase
          .from("leads")
          .select("id", { count: "exact", head: true })
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      const blogs = blogsRes.data ?? [];
      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b) => b.is_published).length,
        totalLeads: leadsRes.count ?? 0,
        recentMessages: recentRes.count ?? 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Blog Posts",
      value: stats.totalBlogs,
      sub: `${stats.publishedBlogs} published`,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      sub: "All time",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Recent Messages",
      value: stats.recentMessages,
      sub: "Last 7 days",
      icon: MessageSquare,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Draft Posts",
      value: stats.totalBlogs - stats.publishedBlogs,
      sub: "Unpublished",
      icon: TrendingUp,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="mb-8 p-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-40 h-full opacity-10">
          <div className="w-40 h-40 rounded-full bg-primary absolute -top-10 -right-10" />
          <div className="w-24 h-24 rounded-full bg-primary absolute bottom-0 right-10" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
          PG-XI Creatives
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome to PG-XI Control Panel
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Signed in as <span className="text-foreground font-medium">{user?.email}</span>
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <Card key={label} className="border border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  {loading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </div>
                <div className={`p-3 rounded-xl ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "New Blog Post", href: "/admin/blog/new", icon: FileText },
            { label: "View Leads", href: "/admin/leads", icon: Users },
            { label: "Site Settings", href: "/admin/settings", icon: MessageSquare },
            { label: "Manage Blogs", href: "/admin/blog", icon: TrendingUp },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-center group"
            >
              <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </a>
          ))}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
