"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaleComparable } from "@/types";
import Image from "next/image";

interface LandSaleComparablesProps {
  data?: {
    salesComparables?: SaleComparable[];
  };
}

// Fallback data in case no comparables are provided
const fallbackComparables: SaleComparable[] = [
  {
    date: "Q3 2023",
    propertyName: "640 Columbia St",
    tenant: "Amazon",
    market: "Red Hook",
    size: "225,000 SF",
    pricePerSqFt: "$425",
    totalPrice: "$95,625,000",
    capRate: 0,
    purchaser: "JLL",
    seller: "JLL",
  },
  {
    date: "Q4 2023",
    propertyName: "55 Bay Street",
    tenant: "Do & Co",
    market: "Red Hook",
    size: "336,000 SF",
    pricePerSqFt: "$405",
    totalPrice: "$136,000,000",
    capRate: 0,
    purchaser: "Goldman",
    seller: "Goldman",
  },
  {
    date: "Q1 2024",
    propertyName: "219 Sullivan Street",
    tenant: "FedEx",
    market: "Red Hook",
    size: "285,000 SF",
    pricePerSqFt: "$415",
    totalPrice: "$118,275,000",
    capRate: 0,
    purchaser: "CBRE",
    seller: "CBRE",
  },
  {
    date: "Q2 2024",
    propertyName: "402 Van Brunt St",
    tenant: "UPS",
    market: "Red Hook",
    size: "195,000 SF",
    pricePerSqFt: "$435",
    totalPrice: "$84,825,000",
    capRate: 0,
    purchaser: "Cushman",
    seller: "Cushman",
  },
];

export function LandSaleComparables({ data }: LandSaleComparablesProps) {
  const comparables = data?.salesComparables || fallbackComparables;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Comparables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Property</th>
                <th className="text-left p-2">Submarket</th>
                <th className="text-left p-2">Date</th>
                <th className="text-right p-2">Size</th>
                <th className="text-right p-2">Price/SF</th>
                <th className="text-right p-2">Total Price</th>
                <th className="text-left p-2">Owner</th>
                <th className="text-left p-2">Tenant</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comparables.map((sale, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="p-2">
                    <div className="font-medium">{sale.propertyName}</div>
                  </td>
                  <td className="p-2">{sale.market}</td>
                  <td className="p-2">{sale.date}</td>
                  <td className="p-2 text-right">{sale.size}</td>
                  <td className="p-2 text-right">{sale.pricePerSqFt}</td>
                  <td className="p-2 text-right">{sale.totalPrice}</td>
                  <td className="p-2">{sale.purchaser || "N/A"}</td>
                  <td className="p-2">{sale.tenant || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
