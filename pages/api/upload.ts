import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import pdfParse from "pdf-parse";
import pdf2table from "pdf2table";
import {
  ExtractedData,
  SaleComparable,
  ProFormaYear,
  ProForma,
  Contact,
} from "@/types";
import {
  extractComparablesFromRows,
  extractProFormaFromRows,
  parseContactsBlock,
} from "@/lib/table-extractors";

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

interface ResponseData {
  success?: boolean;
  error?: string;
  data?: ExtractedData;
  rawText?: string;
}

export function parsePdfTables(buffer: Buffer): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    pdf2table.parse(buffer, (err: any, rows: string[][]) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

const upload = multer({ storage: multer.memoryStorage() });

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<any> => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const router = createRouter<
  NextApiRequestWithFile,
  NextApiResponse<ResponseData>
>();

router
  .use(async (req, res, next) => {
    await runMiddleware(req, res, upload.single("file"));
    next();
  })
  .post(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      if (!req.file.mimetype.includes("pdf")) {
        return res.status(400).json({ error: "File must be a PDF" });
      }

      const { text } = await pdfParse(req.file.buffer);
      const extractedData = await extractPdfData(text);

      let tableRows: string[][] = [];
      try {
        tableRows = await parsePdfTables(req.file.buffer);
      } catch (e) {
        console.warn("Table parse failed, falling back to text-only:", e);
      }

      extractedData.salesComparables = extractComparablesFromRows(tableRows);
      let pf = extractProFormaFromRows(tableRows);
      if (!pf.years?.length) {
        const pages = text.split(/^\s*\d+\s*$/m);
        const proFormaPage = pages.find((p) => /For the Years Ending/i.test(p));
        if (proFormaPage) {
          pf = parseProFormaFromText(proFormaPage);
        }
      }
      extractedData.proForma = pf;

      res.status(200).json({
        success: true,
        data: extractedData as ExtractedData,
        rawText: text,
      });
    } catch (error: any) {
      console.error("PDF processing error:", error);
      res.status(500).json({ error: error.message || "Error processing PDF" });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
}

async function extractPdfData(text: string): Promise<ExtractedData> {
  const pages = text.split(/^\s*\d+\s*$/m);

  const proFormaPage = pages.find((p) => /For the Years Ending/i.test(p)) || "";
  const salesPage = pages.find((p) => /COMPARABLES/i.test(p)) || "";

  const parsedProForma = parseProFormaFromText(proFormaPage);
  const parsedSales = parseSalesComparables(salesPage);

  const data: ExtractedData = {
    propertyOverview: {
      propertyType: extractMatch(text, [
        /Property Type[:\s]+([^.\n]+)/i,
        /Asset Class[:\s]+([^.\n]+)/i,
        /Property Classification[:\s]+([^.\n]+)/i,
        /(\b(?:Industrial|Warehouse|Distribution|Logistics)[^.\n]+(?:Facility|Building|Property|Asset))/i,
      ]),
      propertyName: extractMatch(text, [
        /Property Name[:\s]+([^.\n]+)/i,
        /Project Name[:\s]+([^.\n]+)/i,
        /(?:^|\n)([^.\n]+(?:Industrial|Warehouse|Distribution|Logistics)[^.\n]*)/i,
        /(\d+[^.\n]*(?:Street|Ave|Avenue|Road|Rd|Boulevard|Blvd)[^.\n]*)/i,
      ]),
      location: extractMatch(text, [
        /(?:Property )?Address[:\s]+([^.\n]+)/i,
        /Location[:\s]+([^.\n]+)/i,
        /(?:^|\n)(\d+[^.\n]*(?:Street|Ave|Avenue|Road|Rd|Boulevard|Blvd)[^.\n]*,\s*[^.\n]+)/i,
      ]),
      description: extractParagraph(text, [
        /Property Description[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
        /Executive Summary[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
        /Investment Overview[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
        /(?:Property|Asset|Building) Overview[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
      ]),
    },
    propertyDetails: {
      yearBuilt: extractMatch(text, [
        /Year (?:Built|Constructed)[:\s]+(\d{4})/i,
        /(?:Built|Constructed) in[:\s]+(\d{4})/i,
        /Construction Year[:\s]+(\d{4})/i,
      ]),
      clearHeight: extractMatch(text, [
        /Clear Height[:\s]+([\d.,]+['\"]?\s*(?:feet|foot|ft)?)/i,
        /Ceiling Height[:\s]+([\d.,]+['\"]?\s*(?:feet|foot|ft)?)/i,
      ]),
      totalArea: extractMatch(text, [
        /(?:Total |Gross |Rentable )?(?:Building |Floor )?Area[:\s]+([\d,.]+ (?:SF|Square Feet|sq\.? ?ft\.?))/i,
        /GLA[:\s]+([\d,.]+ (?:SF|Square Feet|sq\.? ?ft\.?))/i,
        /Size[:\s]+([\d,.]+ (?:SF|Square Feet|sq\.? ?ft\.?))/i,
      ]),
      siteArea: extractMatch(text, [
        /(?:Site|Land|Lot) Area[:\s]+([\d,.]+ (?:acres?|AC|SF|Square Feet|sq\.? ?ft\.?))/i,
        /(?:Site|Land|Lot) Size[:\s]+([\d,.]+ (?:acres?|AC|SF|Square Feet|sq\.? ?ft\.?))/i,
      ]),
      buildingClass: extractMatch(text, [
        /Building Class[:\s]+([^.\n]+)/i,
        /Class[:\s]+([A-C][^.\n]*)/i,
      ]),
      construction: extractMatch(text, [
        /Construction[:\s]+([^.\n]+)/i,
        /Building Construction[:\s]+([^.\n]+)/i,
      ]),
      sprinkler: extractMatch(text, [
        /Sprinkler[:\s]+([^.\n]+)/i,
        /Fire Protection[:\s]+([^.\n]+)/i,
      ]),
      dockDoors: {
        count: extractNumber(text, [
          /(\d+)\s*(?:Dock|Loading)\s*Doors?/i,
          /Dock Positions?[:\s]+(\d+)/i,
        ]),
        description: extractMatch(text, [
          /Dock[^.\n]+((?:with|including)[^.\n]+)/i,
        ]),
      },
      driveInDoors: extractNumber(text, [
        /(\d+)\s*Drive-In Doors?/i,
        /Drive-In Positions?[:\s]+(\d+)/i,
      ]),
      parking: {
        spaces: extractNumber(text, [
          /(\d+)\s*(?:Auto |Car )?Parking Spaces?/i,
          /Parking[:\s]+(\d+)\s*spaces?/i,
          /(?:Surface |Structured )?Parking[:\s]+(\d+)/i,
        ]),
        ratio: extractMatch(text, [
          /Parking Ratio[:\s]+([^.\n]+)/i,
          /(?:\d+)\s*spaces\s*per\s*([^.\n]+)/i,
          /(\d+(?:\.\d+)?\/[\d,]+ (?:SF|Square Feet?))/i,
        ]),
      },
      columnSpacing: extractMatch(text, [
        /Column Spacing[:\s]+([^.\n]+)/i,
        /Bay Spacing[:\s]+([^.\n]+)/i,
      ]),
    },
    financialMetrics: {
      askingPrice: {
        value: extractPrice(text, [
          /(?:Asking|List|Purchase) Price[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
          /Price[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
        ]),
        formatted: undefined,
      },
      pricePerSF: {
        value: extractPrice(text, [
          /Price Per (?:SF|Square Foot)[:\s]*\$?([\d,.]+)/i,
          /PSF[:\s]*\$?([\d,.]+)/i,
        ]),
        formatted: undefined,
      },
      noi: {
        value: extractPrice(text, [
          /(?:Net Operating Income|NOI)[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
          /Current NOI[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
        ]),
        formatted: undefined,
      },
      capRate: extractPercentage(text, [
        /Cap(?:italization)? Rate[:\s]*([\d,.]+)\s*%?/i,
        /Going-In Cap Rate[:\s]*([\d,.]+)\s*%?/i,
      ]),
      occupancy: extractPercentage(text, [
        /Occupancy[:\s]*([\d,.]+)\s*%?/i,
        /(?:Property|Building) is ([\d,.]+)\s*%\s*(?:occupied|leased)/i,
      ]),
      stabilizedNOI: {
        value: extractPrice(text, [
          /Stabilized NOI[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
          /Projected NOI[:\s]*\$?([\d,.]+\s*(?:million|M|MM)?)/i,
        ]),
        formatted: undefined,
      },
      operatingExpenses: {
        value: extractPrice(text, [
          /Operating Expenses?[:\s]*\$?([\d,.]+\s*(?:PSF|per sq\.?\s*ft\.?)?)/i,
          /Expenses?[:\s]*\$?([\d,.]+\s*(?:PSF|per sq\.?\s*ft\.?)?)/i,
        ]),
        formatted: undefined,
      },
    },
    tenantInfo: {
      mainTenant: extractMatch(text, [
        /(?:Primary|Major|Anchor) Tenant[:\s]+([^.\n]+)/i,
        /(?:Leased|Occupied) (?:to|by)[:\s]+([^.\n]+)/i,
        /Tenant[:\s]+([^.\n]+)/i,
      ]),
      leaseType: extractMatch(text, [
        /(?:Lease Type|Structure)[:\s]+([^.\n]+)/i,
        /(Triple Net|NNN|Absolute Net)[^.\n]*/i,
      ]),
      termLength: extractMatch(text, [
        /(?:Lease )?Term[:\s]+([^.\n]+)/i,
        /(\d+[\-\s]year[^.\n]*lease)/i,
      ]),
      creditRating: extractMatch(text, [
        /Credit Rating[:\s]+([^.\n]+)/i,
        /(?:S&P|Moody's)[:\s]+([^.\n]+)/i,
      ]),
      buildingUsers: extractList(text, [
        /Major (?:Users|Tenants)[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
        /Notable (?:Users|Tenants)[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
      ]),
    },
    marketInfo: {
      submarket: extractMatch(text, [
        /Submarket[:\s]+([^.\n]+)/i,
        /Market[:\s]+([^.\n]+)/i,
        /Location[:\s]+([^,\n]+)/i,
      ]),
      marketHighlights: extractList(text, [
        /(?:Market Highlights|Key Points|Investment Highlights)[:\s]+((?:[^.\n]+[.\n]){1,10})/i,
        /Demographics[:\s]+((?:[^.\n]+[.\n]){1,5})/i,
        /Market Overview[:\s]+((?:[^.\n]+[.\n]){1,10})/i,
      ]),
      demographics: {
        population: extractMatch(text, [
          /Population[:\s]+([\d,.]+ within [^.\n]+)/i,
          /(\d[\d,.]+ residents? within [^.\n]+)/i,
          /Population[:\s]+([^.\n]+)/i,
        ]),
        householdIncome: extractMatch(text, [
          /Median Household Income[:\s]+([^.\n]+)/i,
          /Average Household Income[:\s]+([^.\n]+)/i,
          /Household Income[:\s]+([^.\n]+)/i,
        ]),
        laborForce: extractMatch(text, [
          /Labor Force[:\s]+([^.\n]+)/i,
          /Workforce[:\s]+([^.\n]+)/i,
          /Employment[:\s]+([^.\n]+)/i,
        ]),
      },
      transport: {
        highways: extractTransportList(
          text,
          /(?:Highway|Interstate)[^:\n]*Access[:\s]+((?:[^.\n]+[.\n]){1,5})/i
        ),
        ports: extractTransportList(
          text,
          /(?:Port|Airport)[^:\n]*Access[:\s]+((?:[^.\n]+[.\n]){1,5})/i
        ),
        distances: extractTransportList(
          text,
          /(?:Distance|Proximity)[^:\n]*[:\s]+((?:[^.\n]+[.\n]){1,5})/i
        ),
      },
    },
    investmentHighlights: extractList(text, [
      /Investment Highlights?[:\s]+((?:[^.\n]+[.\n]){1,20})/i,
      /Investment Considerations?[:\s]+((?:[^.\n]+[.\n]){1,20})/i,
      /Key Points?[:\s]+((?:[^.\n]+[.\n]){1,20})/i,
      /Property Highlights?[:\s]+((?:[^.\n]+[.\n]){1,20})/i,
    ]),
    salesComparables: parsedSales,
    proForma: parsedProForma,
  };

  if (data.financialMetrics.askingPrice.value) {
    data.financialMetrics.askingPrice.formatted = formatLargeNumber(
      data.financialMetrics.askingPrice.value
    );
  }
  if (data.financialMetrics.noi.value) {
    data.financialMetrics.noi.formatted = formatLargeNumber(
      data.financialMetrics.noi.value
    );
  }
  if (data.financialMetrics.stabilizedNOI.value) {
    data.financialMetrics.stabilizedNOI.formatted = formatLargeNumber(
      data.financialMetrics.stabilizedNOI.value
    );
  }
  if (data.financialMetrics.pricePerSF.value) {
    data.financialMetrics.pricePerSF.formatted = `$${data.financialMetrics.pricePerSF.value.toFixed(
      2
    )}`;
  }
  if (data.financialMetrics.operatingExpenses?.value) {
    data.financialMetrics.operatingExpenses.formatted = `$${data.financialMetrics.operatingExpenses.value.toFixed(
      2
    )} PSF`;
  }

  const capitalMarketsContacts = parseContactsBlock(
    text,
    "CAPITAL MARKETS CONTACTS",
    "FINANCING CONTACTS"
  );

  const financingContacts = parseContactsBlock(
    text,
    "FINANCING CONTACTS",
    "SALE COMPARABLES"
  );

  data.capitalMarketsContacts = capitalMarketsContacts;
  data.financingContacts = financingContacts;

  return data;
}

function extractTransportList(text: string, pattern: RegExp): string[] {
  const match = text.match(pattern);
  if (match && match[1]) {
    return match[1]
      .split(/[.\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => item.replace(/^[-•]\s*/, ""));
  }
  return [];
}

function extractMatch(text: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return undefined;
}

function extractParagraph(
  text: string,
  patterns: RegExp[]
): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1]
        .replace(/\s+/g, " ")
        .trim()
        .split(/(?<=\.|\!|\?)\s+/)
        .filter((sentence) => sentence.length > 20)
        .join(" ");
    }
  }
  return undefined;
}

function extractNumber(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const num = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(num)) return num;
    }
  }
  return undefined;
}

function extractPrice(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let value = match[1].toLowerCase();
      // Convert millions to actual number
      if (value.includes("million") || value.includes("m")) {
        const num = parseFloat(value.replace(/[^0-9.]/g, "")) * 1000000;
        if (!isNaN(num)) return num;
      } else {
        const num = parseFloat(value.replace(/[^0-9.]/g, ""));
        if (!isNaN(num)) return num;
      }
    }
  }
  return undefined;
}

function extractPercentage(
  text: string,
  patterns: RegExp[]
): number | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const num = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(num)) return num;
    }
  }
  return undefined;
}

function extractList(text: string, patterns: RegExp | RegExp[]): string[] {
  if (Array.isArray(patterns)) {
    for (const pattern of patterns) {
      const result = extractList(text, pattern);
      if (result.length > 0) return result;
    }
    return [];
  }

  const match = text.match(patterns);
  if (match && match[1]) {
    return match[1]
      .split(/[.\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }
  return [];
}

function parseSalesComparables(pageText: string): SaleComparable[] {
  const comps: SaleComparable[] = [];

  pageText
    .split("\n")
    .map((l) => l.trim())
    // select only lines with 10+ columns
    .filter((l) => {
      const cols = l.split(/\s{2,}/);
      return cols.length >= 10 && !/^Date\s+Property Name/i.test(l);
    })
    .forEach((line) => {
      const cols = line.split(/\s{2,}/).map((c) => c.trim());
      const [
        date,
        propertyName,
        tenant,
        market,
        size,
        totalPriceRaw,
        pricePerSqFtRaw,
        capRateRaw,
        purchaser,
        seller,
      ] = cols;

      comps.push({
        date,
        propertyName,
        tenant,
        market,
        size,
        totalPrice: totalPriceRaw.startsWith("$")
          ? totalPriceRaw
          : `$${totalPriceRaw}`,
        pricePerSqFt: pricePerSqFtRaw.startsWith("$")
          ? pricePerSqFtRaw
          : `$${pricePerSqFtRaw}`,
        capRate: parseFloat(capRateRaw.replace("%", "")),
        purchaser,
        seller,
      });
    });

  return comps;
}

type NumericField = Exclude<keyof ProFormaYear, "ending">;

export function parseProFormaFromText(fullText: string): ProForma {
  const pf: ProForma = { assumptions: {}, years: [] };

  const sectionMatch = fullText.match(
    /For the Years Ending([\s\S]*?)(?=\n\s*\n|$)/i
  );
  if (!sectionMatch) return pf;

  const allLines = sectionMatch[1]
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const headerIdx = allLines.findIndex((l) => /[A-Za-z]{3}-\d{2}/.test(l));
  if (headerIdx < 0) return pf;

  const rawHeader = allLines[headerIdx];
  const spacedHeader = rawHeader.replace(
    /([A-Za-z]{3}-\d{2})(?=[A-Za-z]{3}-\d{2})/g,
    "$1 "
  );
  const yearKeys = spacedHeader.split(/\s+/).map((y) => y.trim());

  pf.years = yearKeys.map<ProFormaYear>((ending) => ({ ending }));

  const rowDefs: { key: NumericField; label: string }[] = [
    { key: "scheduledBaseRent", label: "Scheduled Base Rent" },
    { key: "totalRentalRevenue", label: "Total Rental Revenue" },
    { key: "totalOtherTenantRevenue", label: "Total Other Tenant Revenue" },
    { key: "effectiveGrossRevenue", label: "Effective Gross Revenue" },
    { key: "realEstateTaxes", label: "Real Estate Taxes" },
    { key: "managementFee", label: "Management Fee" },
    { key: "landlordInsurance", label: "Landlord Insurance" },
    { key: "cam", label: "CAM" },
    { key: "totalOperatingExpenses", label: "Total Operating Expenses" },
    { key: "netOperatingIncome", label: "Net Operating Income" },
  ];

  for (const line of allLines.slice(headerIdx + 1)) {
    for (const { key, label } of rowDefs) {
      if (!line.toLowerCase().startsWith(label.toLowerCase())) continue;

      const dataPortion = line.slice(label.length);

      const matches = Array.from(
        dataPortion.matchAll(/(\d{1,3}(?:,\d{3})+)/g)
      ).map((m) => parseInt(m[1].replace(/,/g, ""), 10));

      matches.forEach((num, idx) => {
        if (!isNaN(num) && pf.years[idx]) {
          pf.years[idx][key] = num;
        }
      });
    }
  }

  return pf;
}

function escapeRegex(s: string) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export default router.handler();
