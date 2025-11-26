import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp } from "lucide-react";

const WinnerTracking = () => {
  // Simulate performance data
  const productPerformance = mockProducts.map(product => ({
    ...product,
    totalOrders: Math.floor(Math.random() * 500) + 50,
    totalRevenue: Math.floor(Math.random() * 10000) + 1000,
    storePerformance: {
      DE: Math.floor(Math.random() * 200) + 20,
      ES: Math.floor(Math.random() * 200) + 20,
      PL: Math.floor(Math.random() * 200) + 20,
    }
  })).sort((a, b) => b.totalOrders - a.totalOrders);

  const topWinners = productPerformance.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Winner Product Tracking</h1>
        <p className="text-muted-foreground">
          Track top-performing products across all stores based on unique reference codes
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {topWinners.map((product, idx) => (
          <Card key={product.id} className={idx === 0 ? "border-yellow-500" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {idx === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                {idx === 1 && <Trophy className="h-5 w-5 text-gray-400" />}
                {idx === 2 && <Trophy className="h-5 w-5 text-orange-600" />}
                Rank #{idx + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="font-medium text-sm">{product.title}</p>
              <p className="text-xs text-muted-foreground font-mono">{product.id}</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">{product.totalOrders} Orders</span>
              </div>
              <p className="text-sm text-muted-foreground">€{product.totalRevenue.toLocaleString()} Revenue</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Reference Code</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>DE Orders</TableHead>
                <TableHead>ES Orders</TableHead>
                <TableHead>PL Orders</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productPerformance.map((product, idx) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Badge variant={idx < 3 ? "default" : "outline"}>
                      #{idx + 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="font-medium text-sm">{product.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.totalOrders}</TableCell>
                  <TableCell>€{product.totalRevenue.toLocaleString()}</TableCell>
                  <TableCell>{product.storePerformance.DE}</TableCell>
                  <TableCell>{product.storePerformance.ES}</TableCell>
                  <TableCell>{product.storePerformance.PL}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={idx < 5 ? "default" : "secondary"}
                    >
                      {idx < 5 ? "Winner" : "Active"}
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

export default WinnerTracking;
