"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SaleComparable } from "@/types";

interface LandSaleComparablesProps {
  data?: {
    salesComparables?: SaleComparable[];
  };
}

export function LandSaleComparables({ data }: LandSaleComparablesProps) {
  const comparables = data?.salesComparables;
  if (!comparables?.length) return null;

  return (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle>Sale Comparables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Submarket</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="text-right">Price/SF</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Tenant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparables.map((sale, idx) => (
                <TableRow key={idx} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{sale.propertyName}</div>
                  </TableCell>
                  <TableCell>{sale.market}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="text-right">{sale.size}</TableCell>
                  <TableCell className="text-right">
                    {sale.pricePerSqFt}
                  </TableCell>
                  <TableCell className="text-right">
                    {sale.totalPrice}
                  </TableCell>
                  <TableCell>{sale.purchaser || "N/A"}</TableCell>
                  <TableCell>{sale.tenant || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
