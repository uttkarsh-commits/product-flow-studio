import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockDashboardStats } from "@/lib/mockData";
import { Package, CheckCircle, Archive, Clock, Upload, ClipboardCheck, Settings, Activity } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = mockDashboardStats;

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Pending Approval",
      value: stats.pendingApproval,
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "Published",
      value: stats.published,
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Auto-Archived",
      value: stats.autoArchived,
      icon: Archive,
      color: "text-muted-foreground"
    }
  ];

  const quickActions = [
    {
      title: "Upload Product",
      description: "Add new products with AI enrichment",
      icon: Upload,
      action: () => navigate("/upload")
    },
    {
      title: "Review & Approve",
      description: "Approve products for publishing",
      icon: ClipboardCheck,
      action: () => navigate("/review")
    },
    {
      title: "KPI Rules",
      description: "Configure automation rules",
      icon: Settings,
      action: () => navigate("/kpi-rules")
    },
    {
      title: "Activity Logs",
      description: "View system activity history",
      icon: Activity,
      action: () => navigate("/logs")
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your product lifecycle management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card 
              key={action.title}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={action.action}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
