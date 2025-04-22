"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProFormaYear } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ProFormaAnalysisProps {
  data?: {
    proForma?: {
      assumptions?: {
        rentGrowth?: number;
        opexGrowth?: number;
        taxGrowth?: number;
        terminalCapRate?: number;
      };
      years?: ProFormaYear[];
    };
  };
}

// Fallback data
const fallbackProForma = {
  assumptions: {
    rentGrowth: 3,
    opexGrowth: 2.5,
    taxGrowth: 2,
    terminalCapRate: 5.5,
  },
  years: Array.from({ length: 10 }, (_, i) => ({
    year: i + 1,
    baseRent: 5000000 * Math.pow(1.03, i),
    operatingExpenses: 1500000 * Math.pow(1.025, i),
    taxes: 800000 * Math.pow(1.02, i),
    netOperatingIncome: 0, // Calculated below
    cashFlow: 0, // Calculated below
    capEx: 200000,
    occupancy: 95,
  })).map((year) => ({
    ...year,
    netOperatingIncome: year.baseRent - year.operatingExpenses - year.taxes,
    cashFlow: year.baseRent - year.operatingExpenses - year.taxes - year.capEx,
  })),
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProFormaAnalysis({ data }: ProFormaAnalysisProps) {
  const proForma = data?.proForma || fallbackProForma;
  const years = proForma.years || [];
  const assumptions = proForma.assumptions;

  // Early return if no pro forma data
  if (!data?.proForma?.years?.length) {
    return null;
  }

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>10-Year Pro Forma Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Month</TableHead>
              <TableHead className="text-right">Base Rent</TableHead>
              <TableHead className="text-right">Total Rental Revenue</TableHead>
              <TableHead className="text-right">
                Total Other Tenant Revenue
              </TableHead>
              <TableHead className="text-right">
                Effective Gross Revenue
              </TableHead>
              <TableHead className="text-right">Real Estate Taxes</TableHead>
              <TableHead className="text-right">Management Fee</TableHead>
              <TableHead className="text-right">Landlord Insurance</TableHead>
              <TableHead className="text-right">Cam</TableHead>
              <TableHead className="text-right">
                Total Operating Expenses
              </TableHead>
              <TableHead className="text-right">Net Operating Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.proForma.years.map((year, index) => (
              <TableRow key={index}>
                <TableCell>Year {index + 1}</TableCell>
                <TableCell className="text-right">{year.ending}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.scheduledBaseRent)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.totalRentalRevenue)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.totalOtherTenantRevenue)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.effectiveGrossRevenue)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.realEstateTaxes)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.managementFee)}
                </TableCell>
                <TableCell className="text-right">
                  {year.landlordInsurance}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.cam)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.totalOperatingExpenses)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(year.netOperatingIncome)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
