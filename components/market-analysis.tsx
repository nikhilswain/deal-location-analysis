"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarketAnalysisProps {
  data?: {
    marketInfo?: {
      submarket?: string;
      marketHighlights?: string[];
      demographics?: {
        population?: string;
        householdIncome?: string;
        laborForce?: string;
      };
      transport?: {
        highways?: string[];
        ports?: string[];
        distances?: string[];
      };
    };
  };
}

export function MarketAnalysis({ data }: MarketAnalysisProps) {
  const highways = data?.marketInfo?.transport?.highways ?? [];
  const ports = data?.marketInfo?.transport?.ports ?? [];
  const distances = data?.marketInfo?.transport?.distances ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Submarket</h3>
              <p className="text-sm">
                {data?.marketInfo?.submarket || "Red Hook, Brooklyn"}
              </p>
            </div>

            {(data?.marketInfo?.demographics || highways.length > 0) && (
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Demographics & Access
                </h3>
                <div className="space-y-2">
                  {data?.marketInfo?.demographics?.population && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Population
                      </div>
                      <div className="text-sm">
                        {data.marketInfo.demographics.population}
                      </div>
                    </div>
                  )}
                  {data?.marketInfo?.demographics?.householdIncome && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Household Income
                      </div>
                      <div className="text-sm">
                        {data.marketInfo.demographics.householdIncome}
                      </div>
                    </div>
                  )}
                  {data?.marketInfo?.demographics?.laborForce && (
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Labor Force
                      </div>
                      <div className="text-sm">
                        {data.marketInfo.demographics.laborForce}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(highways.length > 0 ||
              ports.length > 0 ||
              distances.length > 0) && (
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Transportation Access
                </h3>
                {highways.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-muted-foreground">
                      Highway Access
                    </div>
                    <ul className="text-sm list-disc pl-4">
                      {highways.map((highway, index) => (
                        <li key={index}>{highway}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {ports.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-muted-foreground">
                      Port/Airport Access
                    </div>
                    <ul className="text-sm list-disc pl-4">
                      {ports.map((port, index) => (
                        <li key={index}>{port}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {distances.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Key Distances
                    </div>
                    <ul className="text-sm list-disc pl-4">
                      {distances.map((distance, index) => (
                        <li key={index}>{distance}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {data?.marketInfo?.marketHighlights &&
              data.marketInfo.marketHighlights.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Market Highlights
                  </h3>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    {data.marketInfo.marketHighlights.map(
                      (highlight, index) => (
                        <li key={index}>{highlight}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
