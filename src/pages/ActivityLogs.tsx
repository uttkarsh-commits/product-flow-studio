import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockActivityLogs } from "@/lib/mockData";

const ActivityLogs = () => {
  const [logs] = useState(mockActivityLogs);

  const getActionBadge = (action: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      "Product Upload": "default",
      "Product Approved": "secondary",
      "KPI Check": "outline",
      "Auto-Archive": "destructive",
      "Compare-at Price": "secondary"
    };
    return <Badge variant={variants[action] || "default"}>{action}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Activity Logs</h1>
        <p className="text-muted-foreground">
          Complete history of system actions and decisions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Logs</TableHead>
                <TableHead>Retries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-mono text-sm">{log.productId}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs">
                    {log.logs}
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.retryAttempts > 0 ? "outline" : "secondary"}>
                      {log.retryAttempts}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
