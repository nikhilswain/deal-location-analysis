"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaseAnalysisProps {
  data?: {
    tenantInfo?: {
      mainTenant?: string;
      leaseType?: string;
      termLength?: string;
      creditRating?: string;
    };
    financialMetrics?: {
      occupancy?: number;
    };
  };
}

export function LeaseAnalysis({ data }: LeaseAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lease Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">
                Primary Tenant
              </div>
              <div className="font-medium">
                {data?.tenantInfo?.mainTenant || "Amazon"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Credit Rating</div>
              <div className="font-medium">
                {data?.tenantInfo?.creditRating || "AA"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Lease Type</div>
              <div className="font-medium">
                {data?.tenantInfo?.leaseType || "NNN"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Term Length</div>
              <div className="font-medium">
                {data?.tenantInfo?.termLength || "15 years"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Occupancy</div>
              <div className="font-medium">
                {data?.financialMetrics?.occupancy
                  ? `${data.financialMetrics.occupancy}%`
                  : "100%"}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium mb-2">Lease Structure</h3>
            <div className="text-sm text-muted-foreground">
              {data?.tenantInfo?.leaseType === "NNN" ||
              data?.tenantInfo?.leaseType?.includes("Triple Net")
                ? "Triple Net (NNN) lease structure where tenant is responsible for all operating expenses, including property taxes, insurance, and maintenance."
                : data?.tenantInfo?.leaseType?.includes("Absolute Net")
                ? "Absolute Net lease structure where tenant bears all costs and risks associated with the property."
                : "Standard lease structure with typical tenant responsibilities and obligations."}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
