"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialMetricsProps {
  data?: {
    financialMetrics?: {
      askingPrice?: { formatted?: string; value?: number };
      noi?: { formatted?: string; value?: number };
      stabilizedNOI?: { formatted?: string; value?: number };
      capRate?: number;
      pricePerSF?: { formatted?: string; value?: number };
      occupancy?: number;
    };
  };
}

export function FinancialMetrics({ data }: FinancialMetricsProps) {
  const metrics = [
    {
      label: "Purchase Price",
      value: data?.financialMetrics?.askingPrice?.formatted || "$143,000,000",
    },
    {
      label: "Current NOI",
      value: data?.financialMetrics?.noi?.formatted || "$7,150,000",
    },
    {
      label: "Stabilized NOI",
      value: data?.financialMetrics?.stabilizedNOI?.formatted || "$8,200,000",
    },
    {
      label: "Cap Rate",
      value: data?.financialMetrics?.capRate
        ? `${data.financialMetrics.capRate}%`
        : "5.0%",
    },
    {
      label: "Price PSF",
      value: data?.financialMetrics?.pricePerSF?.formatted || "$458.33",
    },
    {
      label: "Occupancy",
      value: data?.financialMetrics?.occupancy
        ? `${data.financialMetrics.occupancy}%`
        : "100%",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="text-xs text-muted-foreground">
                {metric.label}
              </div>
              <div className="font-medium">{metric.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
