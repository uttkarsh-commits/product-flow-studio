import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { toast } from "sonner";

const LifecycleSimulation = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [simulationResult, setSimulationResult] = useState("");

  const runSimulation = (type: string) => {
    let result = "";
    
    switch (type) {
      case "order":
        result = "Simulated new order for product REF-2025-FASH-00123. Order count increased to 51. Compare-at price threshold reached - adjusting price by 30%.";
        break;
      case "adspend":
        result = "Simulated ad spend of $150 for product REF-2025-JEWE-00124. Total ad spend now $500.50. Within acceptable limits.";
        break;
      case "lifecycle":
        result = "Running lifecycle check on all products:\n\n- REF-2025-FASH-00123: Active (51 orders, meets threshold)\n- REF-2025-JEWE-00124: Active (45 orders, $500.50 ads)\n- REF-2025-FASH-00125: Active (120 orders, performing well)\n- REF-2025-FASH-00122: Archived (2 orders in 90 days, below minimum)";
        break;
    }
    
    setSimulationResult(result);
    setDialogOpen(true);
    toast.success("Simulation completed!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lifecycle Simulation</h1>
        <p className="text-muted-foreground">
          Test automation rules with simulated scenarios
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Simulate Order</CardTitle>
            <CardDescription>
              Add a mock order to test compare-at price triggers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => runSimulation("order")} className="w-full">
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Simulate Ad Spend</CardTitle>
            <CardDescription>
              Add mock ad spend to test budget limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => runSimulation("adspend")} className="w-full">
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="text-lg">Lifecycle Check</CardTitle>
            <CardDescription>
              Run auto-archive rules on all products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => runSimulation("lifecycle")} className="w-full">
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Simulation
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulation Result</DialogTitle>
            <DialogDescription>
              This is a mock simulation showing what would happen in the real system
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{simulationResult}</pre>
          </div>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LifecycleSimulation;
