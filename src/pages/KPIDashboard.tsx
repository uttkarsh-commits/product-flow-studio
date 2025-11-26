import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockProducts } from "@/lib/mockData";
import { CheckCircle, XCircle } from "lucide-react";

const KPIDashboard = () => {
  const [products] = useState(mockProducts);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">KPI Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor product performance and lifecycle metrics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Lifetime Orders</TableHead>
                <TableHead>Ads Spend</TableHead>
                <TableHead>Compare-at</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Pricing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.lifetimeOrders}</TableCell>
                  <TableCell>${product.adsSpend.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.compareAtTriggered ? (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm">Inactive</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.autoArchiveStatus === "Active"
                          ? "default"
                          : product.autoArchiveStatus === "Flagged"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {product.autoArchiveStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>DE: €{product.pricing.DE}</div>
                      <div>ES: €{product.pricing.ES}</div>
                      <div>PL: zł{product.pricing.PL}</div>
                    </div>
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

export default KPIDashboard;
