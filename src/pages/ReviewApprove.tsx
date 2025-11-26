import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { mockProducts } from "@/lib/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const ReviewApprove = () => {
  const [products] = useState(mockProducts);
  const [selectedStores, setSelectedStores] = useState<{ [key: string]: string[] }>({});
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPublishStores, setSelectedPublishStores] = useState<string[]>([]);

  const handleStoreToggle = (productId: string, store: string) => {
    setSelectedStores(prev => {
      const current = prev[productId] || [];
      const updated = current.includes(store)
        ? current.filter(s => s !== store)
        : [...current, store];
      return { ...prev, [productId]: updated };
    });
  };

  const handlePublish = (productId: string) => {
    setSelectedProduct(productId);
    setSelectedLanguages([]);
    setSelectedPublishStores([]);
    setPublishDialogOpen(true);
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handlePublishStoreToggle = (store: string) => {
    setSelectedPublishStores(prev => 
      prev.includes(store) 
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  const confirmPublish = () => {
    if (selectedLanguages.length === 0 || selectedPublishStores.length === 0) {
      toast.error("Please select at least one language and one store");
      return;
    }
    toast.success(`Product published to ${selectedPublishStores.length} store(s) with ${selectedLanguages.length} language(s)`);
    setPublishDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "outline",
      approved: "secondary",
      published: "default"
    };
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Review & Approve Products</h1>
        <p className="text-muted-foreground">
          Review uploaded products and approve them for publishing
        </p>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {product.title}
                    {getStatusBadge(product.status)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.id}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type & SKU</p>
                    <p className="text-sm text-muted-foreground">
                      {product.type} • {product.sku}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tags</p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Variants</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="bg-muted p-2 rounded">
                      {variant.size} • {variant.color} • Stock: {variant.stock}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Market Pricing</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-muted p-2 rounded">DE: €{product.pricing.DE}</div>
                  <div className="bg-muted p-2 rounded">ES: €{product.pricing.ES}</div>
                  <div className="bg-muted p-2 rounded">PL: zł{product.pricing.PL}</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Select Stores for Publishing</p>
                <div className="flex gap-4">
                  {["DE", "ES", "PL"].map(store => (
                    <div key={store} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${product.id}-${store}`}
                        checked={selectedStores[product.id]?.includes(store)}
                        onCheckedChange={() => handleStoreToggle(product.id, store)}
                      />
                      <label
                        htmlFor={`${product.id}-${store}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {store}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => toast.success("Product approved!")}>
                  Approve Product
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePublish(product.id)}
                  disabled={!selectedStores[product.id]?.length}
                >
                  Publish to Shopify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Publish to Shopify</DialogTitle>
            <DialogDescription>
              Select languages and stores for publishing this product
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Select Languages</p>
              <div className="grid grid-cols-2 gap-2">
                {["English", "German", "Spanish", "Polish"].map(language => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${language}`}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                    />
                    <label htmlFor={`lang-${language}`} className="text-sm cursor-pointer">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Select Stores</p>
              <div className="grid grid-cols-3 gap-2">
                {["DE", "ES", "PL"].map(store => (
                  <div key={store} className="flex items-center space-x-2">
                    <Checkbox
                      id={`publish-${store}`}
                      checked={selectedPublishStores.includes(store)}
                      onCheckedChange={() => handlePublishStoreToggle(store)}
                    />
                    <label htmlFor={`publish-${store}`} className="text-sm font-medium cursor-pointer">
                      {store}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={confirmPublish} 
                className="flex-1"
                disabled={selectedLanguages.length === 0 || selectedPublishStores.length === 0}
              >
                Confirm Publish
              </Button>
              <Button variant="outline" onClick={() => setPublishDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewApprove;
