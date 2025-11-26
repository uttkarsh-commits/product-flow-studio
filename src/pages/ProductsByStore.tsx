import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { mockProducts } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Archive } from "lucide-react";

const ProductsByStore = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const stores = ["DE", "ES", "PL"];

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleArchiveSelected = () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product to archive");
      return;
    }
    toast.success(`Archived ${selectedProducts.length} product(s) from all stores`);
    setSelectedProducts([]);
  };

  const handleArchiveSingle = (productId: string) => {
    toast.success(`Archived product ${productId} from all stores`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products by Store</h1>
          <p className="text-muted-foreground">
            View all products uploaded to each store
          </p>
        </div>
        <Button
          onClick={handleArchiveSelected}
          disabled={selectedProducts.length === 0}
          variant="destructive"
        >
          <Archive className="mr-2 h-4 w-4" />
          Archive Selected ({selectedProducts.length})
        </Button>
      </div>

      {stores.map(store => (
        <Card key={store}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Store: {store}
              <Badge variant="secondary">{mockProducts.length} Products</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === mockProducts.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProducts(mockProducts.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{product.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>
                      {store === "DE" && `€${product.pricing.DE}`}
                      {store === "ES" && `€${product.pricing.ES}`}
                      {store === "PL" && `zł${product.pricing.PL}`}
                    </TableCell>
                    <TableCell>
                      {product.variants.reduce((sum, v) => sum + v.stock, 0)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "published" ? "default" : "outline"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleArchiveSingle(product.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsByStore;
