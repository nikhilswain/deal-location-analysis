import { SaleComparable, ProForma, ProFormaYear } from "@/types";

export function extractComparablesFromRows(rows: string[][]): SaleComparable[] {
  const comps: SaleComparable[] = [];

  const headerIdx = rows.findIndex((r) => r[0]?.trim() === "Date");
  if (headerIdx < 0) return comps;

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[0]) break;
    if (r.length < 10) continue;

    const [
      date,
      propertyName,
      tenant,
      market,
      size,
      totalPrice,
      pricePerSqFt,
      capRateStr,
      purchaser,
      seller,
    ] = r;

    comps.push({
      date: date.trim(),
      propertyName: propertyName.trim(),
      tenant: tenant.trim(),
      market: market.trim(),
      size: size.trim(),
      totalPrice: totalPrice.trim().startsWith("$")
        ? totalPrice.trim()
        : `$${totalPrice.trim()}`,
      pricePerSqFt: pricePerSqFt.trim().startsWith("$")
        ? pricePerSqFt.trim()
        : `$${pricePerSqFt.trim()}`,
      capRate: parseFloat(capRateStr.replace("%", "").trim()),
      purchaser: purchaser.trim(),
      seller: seller.trim(),
    });
  }
  return comps;
}

export function extractProFormaFromRows(rows: string[][]): ProForma {
  const pf: ProForma = { assumptions: {}, years: [] };

  const headerRow = rows.find((r) =>
    r[0]?.trim().startsWith("For the Years Ending")
  );
  if (!headerRow) return pf;

  const yearKeys = headerRow.slice(1).map((cell) => cell.trim());
  pf.years = yearKeys.map<ProFormaYear>((ending) => ({ ending }));

  const labelMap: Record<string, keyof ProFormaYear> = {
    "Scheduled Base Rent": "scheduledBaseRent",
    "Total Rental Revenue": "totalRentalRevenue",
    "Total Other Tenant Revenue": "totalOtherTenantRevenue",
    "Effective Gross Revenue": "effectiveGrossRevenue",
    "Real Estate Taxes": "realEstateTaxes",
    "Management Fee": "managementFee",
    "Landlord Insurance": "landlordInsurance",
    CAM: "cam",
    "Total Operating Expenses": "totalOperatingExpenses",
    "Net Operating Income": "netOperatingIncome",
  };

  for (const row of rows) {
    const label = row[0]?.trim();
    if (!label) continue;
    const key = labelMap[label];
    if (!key) continue;

    row.slice(1, 1 + pf.years.length).forEach((cell, idx) => {
      const num = parseInt(cell.replace(/,/g, "").trim(), 10);
      if (!isNaN(num)) {
        (pf.years[idx][key] as any) = num;
      }
    });
  }

  return pf;
}
