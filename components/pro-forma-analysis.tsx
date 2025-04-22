"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { formatCurrency } from "@/lib/format-currency";

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

export function ProFormaAnalysis({ data }: ProFormaAnalysisProps) {
  if (!data?.proForma?.years?.length) {
    return null;
  }

  return (
    <Card className="bg-blue-50">
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
                <TableCell className="whitespace-nowrap">
                  Year {index + 1}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {year.ending}
                </TableCell>
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
