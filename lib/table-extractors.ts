import { SaleComparable, ProForma, ProFormaYear, Contact } from "@/types";

export function extractComparablesFromRows(rows: string[][]): SaleComparable[] {
  const comps: SaleComparable[] = [];

  const headerIdx = rows.findIndex((r) => r[0]?.trim() === "Date");
  if (headerIdx < 0) return comps;

  const sizeRE = /^\d{1,3}(?:,\d{3})*$/;

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i].map((c) => c.trim());
    if (!r[0]) break;

    if (r.length < 6) continue;

    const date = r[0];
    const propertyName = r[1] || "";
    const tenant = r[2] || "";

    const sizeIdx = r.findIndex((cell) => sizeRE.test(cell));
    if (sizeIdx < 3) continue;

    const market = r.slice(3, sizeIdx).join(" ");

    const size = r[sizeIdx];
    const totalPrice = r[sizeIdx + 1] || "";
    const pricePerSqFt = r[sizeIdx + 2] || "";
    const capRateStr = r[sizeIdx + 3] || "";
    const purchaser = r[sizeIdx + 4] || "";
    const seller = r.slice(sizeIdx + 5).join(" ") || "";

    comps.push({
      date,
      propertyName,
      tenant,
      market,
      size,
      totalPrice: totalPrice.startsWith("$") ? totalPrice : `$${totalPrice}`,
      pricePerSqFt: pricePerSqFt.startsWith("$")
        ? pricePerSqFt
        : `$${pricePerSqFt}`,
      capRate: parseFloat(capRateStr.replace("%", "")) || 0,
      purchaser,
      seller,
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

export function parseContactsBlock(
  text: string,
  startHeading: string,
  endHeading: string
): Contact[] {
  // 1) escape any regex metacharacters, then replace spaces with \s+
  const escapeHeading = (s: string) =>
    s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/ +/g, "\\s+");

  const startPat = escapeHeading(startHeading) + "\\s*\\.";
  const endPat = escapeHeading(endHeading) + "\\s*\\.";
  const re = new RegExp(`${startPat}([\\s\\S]*?)${endPat}`, "i");

  const m = text.match(re);
  if (!m) return [];

  // Grab everything between the two headings...
  const block = m[1];

  // 2) Split into lines, drop blank / pure‑digits (page nums) / stray headers
  const lines = block
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => {
      return (
        l &&
        !/^\d+$/.test(l) &&
        !new RegExp(`^${startHeading}\\.$`, "i").test(l) &&
        !new RegExp(`^${endHeading}\\.$`, "i").test(l)
      );
    });

  const contacts: Contact[] = [];
  let buf: string[] = [];

  for (const line of lines) {
    // whenever we hit an email, that marks the end of one record
    if (/@\w+\.\w+/.test(line)) {
      const email = line;
      const phone = buf.pop() || "";
      const name = buf.shift() || "";
      const title = buf.join(" ").trim();
      contacts.push({ name, title, phone, email });
      buf = [];
    } else {
      buf.push(line);
    }
  }

  return contacts;
}
