import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { mockKPIRules } from "@/lib/mockData";
import { toast } from "sonner";

const KPIRules = () => {
  const [rules, setRules] = useState(mockKPIRules);

  const handleSave = () => {
    toast.success("KPI rules updated successfully!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">KPI & Automation Rules</h1>
        <p className="text-muted-foreground">
          Configure automated lifecycle management rules
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compare-at Price Rules</CardTitle>
          <CardDescription>
            Automatically adjust compare-at pricing based on order thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="compareAt">Compare-at Percentage Increase (%)</Label>
            <Input
              id="compareAt"
              type="number"
              value={rules.compareAtPercent}
              onChange={(e) => setRules({ ...rules, compareAtPercent: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              When order threshold is met, increase price by this percentage
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderThreshold">Order Threshold</Label>
            <Input
              id="orderThreshold"
              type="number"
              value={rules.orderThreshold}
              onChange={(e) => setRules({ ...rules, orderThreshold: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              Number of orders required to trigger compare-at price
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Archive Rules</CardTitle>
          <CardDescription>
            Automatically archive low-performing products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="archiveDays">Archive After (Days)</Label>
            <Input
              id="archiveDays"
              type="number"
              value={rules.autoArchiveDays}
              onChange={(e) => setRules({ ...rules, autoArchiveDays: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              Archive products that haven't met minimum sales after this many days
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minSales">Minimum Sales Threshold</Label>
            <Input
              id="minSales"
              type="number"
              value={rules.minimumSales}
              onChange={(e) => setRules({ ...rules, minimumSales: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              Products must achieve this many sales to avoid archival
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advertising Limits</CardTitle>
          <CardDescription>
            Set maximum ad spend per product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adsLimit">Maximum Ads Spend ($)</Label>
            <Input
              id="adsLimit"
              type="number"
              value={rules.adsSpendLimit}
              onChange={(e) => setRules({ ...rules, adsSpendLimit: Number(e.target.value) })}
            />
            <p className="text-sm text-muted-foreground">
              Stop ads when spend reaches this limit
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store-Specific Overrides</CardTitle>
          <CardDescription>
            Enable or disable rules for specific markets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(rules.storeOverrides).map(([store, config]) => (
            <div key={store} className="flex items-center justify-between">
              <Label htmlFor={`store-${store}`} className="text-base">
                {store} Market
              </Label>
              <Switch
                id={`store-${store}`}
                checked={config.enabled}
                onCheckedChange={(checked) => {
                  setRules({
                    ...rules,
                    storeOverrides: {
                      ...rules.storeOverrides,
                      [store]: { enabled: checked }
                    }
                  });
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
};

export default KPIRules;
