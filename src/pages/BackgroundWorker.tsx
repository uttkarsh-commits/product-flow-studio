import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const BackgroundWorker = () => {
  const [workerStatus, setWorkerStatus] = useState<"Running" | "Idle">("Idle");
  const [lastRun, setLastRun] = useState("2025-01-15 14:30:00");

  const runWorker = () => {
    setWorkerStatus("Running");
    toast.info("Background worker started...");
    
    setTimeout(() => {
      setWorkerStatus("Idle");
      setLastRun(new Date().toLocaleString("sv-SE").replace("T", " ").slice(0, 19));
      toast.success("Background worker completed!");
    }, 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Background Worker</h1>
        <p className="text-muted-foreground">
          Monitor and control automated background processes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Worker Status</CardTitle>
          <CardDescription>
            Current status of the lifecycle management background worker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Status</p>
              <Badge
                variant={workerStatus === "Running" ? "default" : "secondary"}
                className="text-base"
              >
                {workerStatus === "Running" ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Running
                  </>
                ) : (
                  "Idle"
                )}
              </Badge>
            </div>
            <Button onClick={runWorker} disabled={workerStatus === "Running"}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Now
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Last Run Time</p>
              <p className="text-2xl font-mono">{lastRun}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Next Scheduled Run</p>
              <p className="text-2xl font-mono">15 minutes</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Worker Tasks</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Check all products for order threshold triggers</li>
              <li>• Apply compare-at price adjustments</li>
              <li>• Evaluate auto-archive conditions</li>
              <li>• Monitor ad spend limits</li>
              <li>• Sync status with Shopify stores</li>
              <li>• Generate activity logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Worker Activity</CardTitle>
          <CardDescription>
            Last 5 worker execution results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "14:30:00", result: "Completed - 3 products updated" },
              { time: "14:15:00", result: "Completed - 1 product archived" },
              { time: "14:00:00", result: "Completed - No changes required" },
              { time: "13:45:00", result: "Completed - 2 compare-at prices adjusted" },
              { time: "13:30:00", result: "Completed - No changes required" }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between bg-muted p-3 rounded">
                <span className="font-mono text-sm">{activity.time}</span>
                <span className="text-sm text-muted-foreground">{activity.result}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundWorker;
