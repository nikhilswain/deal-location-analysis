"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyAssumptionsProps {
  data?: {
    propertyDetails?: {
      totalArea?: string;
      yearBuilt?: string;
      clearHeight?: string;
    };
    financialMetrics?: {
      capRate?: number;
      pricePerSF?: {
        formatted?: string;
        value?: number;
      };
      occupancy?: number;
      noi?: {
        formatted?: string;
        value?: number;
      };
    };
  };
}

export function KeyAssumptions({ data }: KeyAssumptionsProps) {
  // Calculate assumptions based on available data
  const rentableSF =
    data?.propertyDetails?.totalArea?.match(/[\d,]+/)?.[0].replace(/,/g, "") ||
    "312000";
  const marketRentPSF = data?.financialMetrics?.noi?.value
    ? ((data.financialMetrics.noi.value * 12) / parseInt(rentableSF)).toFixed(2)
    : "28.00";

  const assumptions = [
    {
      label: "Market Rent PSF",
      value: `$${marketRentPSF}`,
      note: "Annual NNN rent per square foot",
    },
    {
      label: "Market Vacancy",
      value: data?.financialMetrics?.occupancy
        ? `${(100 - data.financialMetrics.occupancy).toFixed(1)}%`
        : "5.0%",
      note: "Long-term market vacancy rate",
    },
    {
      label: "Exit Cap Rate",
      value: data?.financialMetrics?.capRate
        ? `${(data.financialMetrics.capRate + 0.5).toFixed(1)}%`
        : "5.5%",
      note: "Assumed exit capitalization rate",
    },
    {
      label: "Annual Rent Growth",
      value: "3.0%",
      note: "Projected annual rent increase",
    },
    {
      label: "Operating Expenses",
      value: "$3.50 PSF",
      note: "Triple net operating expenses",
    },
    {
      label: "Property Tax Rate",
      value: "1.85%",
      note: "Of assessed value",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Assumptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assumptions.map((assumption, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-xs text-muted-foreground">
                  {assumption.label}
                </div>
                <div className="font-medium">{assumption.value}</div>
              </div>
              <div className="text-xs text-muted-foreground/75 italic">
                {assumption.note}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
