import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const UploadProduct = () => {
  const navigate = useNavigate();
  const [flowType, setFlowType] = useState("");
  const [isEnriching, setIsEnriching] = useState(false);
  const [isEnriched, setIsEnriched] = useState(false);
  const [productRef, setProductRef] = useState("");

  const handleAIEnrichment = () => {
    setIsEnriching(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsEnriching(false);
      setIsEnriched(true);
      const ref = `REF-2025-${flowType === "fashion" ? "FASH" : "JEWE"}-${String(Math.floor(Math.random() * 1000)).padStart(5, "0")}`;
      setProductRef(ref);
      toast.success("AI enrichment completed!");
    }, 2000);
  };

  const handleSaveProduct = () => {
    toast.success("Product saved successfully!");
    setTimeout(() => {
      navigate("/review");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Product</h1>
        <p className="text-muted-foreground">
          Add new products with automated AI enrichment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Upload images and basic product details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <Input type="file" multiple accept="image/*" />
            <p className="text-sm text-muted-foreground">
              Upload multiple product images (preview only)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" placeholder="Enter product title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="flowType">Flow Type</Label>
            <Select value={flowType} onValueChange={setFlowType}>
              <SelectTrigger id="flowType">
                <SelectValue placeholder="Select flow type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion Flow (A)</SelectItem>
                <SelectItem value="jewelry">Jewelry Flow (B)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {flowType && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input id="size" placeholder="S, M, L" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Red, Blue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" placeholder="100" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceDE">Price (DE) €</Label>
                  <Input id="priceDE" type="number" step="0.01" placeholder="29.99" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceES">Price (ES) €</Label>
                  <Input id="priceES" type="number" step="0.01" placeholder="27.99" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePL">Price (PL) zł</Label>
                  <Input id="pricePL" type="number" step="0.01" placeholder="119.99" />
                </div>
              </div>

              <Button
                onClick={handleAIEnrichment}
                disabled={isEnriching || isEnriched}
                className="w-full"
              >
                {isEnriching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating AI Enrichment...
                  </>
                ) : isEnriched ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    AI Enrichment Complete
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Enrichment
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {isEnriched && (
        <>
          <Card className="border-success">
            <CardHeader>
              <CardTitle className="text-success">AI Generated Content</CardTitle>
              <CardDescription>Product Reference: {productRef}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Generated Title</Label>
                <Input
                  value={flowType === "fashion" ? "Premium Cotton T-Shirt - Comfortable Daily Wear" : "Elegant Silver Chain Necklace - Sterling Silver"}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label>Generated Description</Label>
                <Textarea
                  value={flowType === "fashion" 
                    ? "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece is perfect for everyday wear. Features a classic fit, reinforced stitching, and comes in multiple colors and sizes."
                    : "Elevate your style with our elegant sterling silver chain necklace. Crafted with precision, this timeless piece features a delicate chain design perfect for any occasion. Available in multiple lengths to suit your preference."
                  }
                  rows={4}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Type</Label>
                  <Input value={flowType === "fashion" ? "Apparel" : "Jewelry"} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input value={`${flowType.toUpperCase()}-${Math.random().toString(36).substring(7).toUpperCase()}`} readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vendor Details</Label>
                <Input
                  value={flowType === "fashion" ? "Premium Cotton Co." : "Sterling Silver Crafts Ltd."}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label>Generated Tags</Label>
                <Input
                  value={flowType === "fashion" ? "fashion, cotton, casual, t-shirt, organic" : "jewelry, silver, necklace, elegant, sterling"}
                  readOnly
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSaveProduct} className="flex-1">
              Save Product
            </Button>
            <Button onClick={handleSaveProduct} variant="outline" className="flex-1">
              Proceed to Review
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadProduct;
