"use client";

import { ExtractedData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Download,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SupplyPipeline } from "../components/supply-pipeline";
import { ProximityInsights } from "../components/proximity-insights";
import { ZoningOverlays } from "../components/zoning-overlays";
import { FinancialMetrics } from "../components/financial-metrics";
import { KeyAssumptions } from "../components/key-assumptions";
import { MarketAnalysis } from "../components/market-analysis";
import { LeaseAnalysis } from "../components/lease-analysis";
import { AssetLevelData } from "../components/asset-level-data";
import DemographicPage from "@/components/demographic-trends-v2";
import jsPDF from "jspdf";
import { PdfUpload } from "@/components/pdf-upload";
import { UploadDate } from "@/components/upload-date";
import { ProFormaAnalysis } from "@/components/pro-forma-analysis";
import { LandSaleComparablesStatic } from "@/components/land-sale-comparables-static";
import { LandSaleComparables } from "@/components/land-sale-comparables";
import { formatCurrency } from "@/lib/format-currency";
import { ContactCard } from "@/components/contact-card";
import { ToggleableContent } from "@/components/toggle-content";
import { JsonViewer } from "@/components/json-view";

interface PropertyData {
  propertyName: string;
  seller: string;
  guidancePrice: string;
  guidancePricePSF: string;
  capRate: string;
  propertySize: string;
  landArea: string;
}

export default function LocationAnalysis() {
  const [selectedModel, setSelectedModel] = useState(
    "Industrial.Template.v2.4.xlsx"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [extractedTextData, setExtractedTextData] =
    useState<any>("No Pdf Uploaded");
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyName: "280 Richards, Brooklyn, NY",
    seller: "Thor Equities",
    guidancePrice: "$143,000,000",
    guidancePricePSF: "$23.92",
    capRate: "5.0%",
    propertySize: "312,000 sqft",
    landArea: "16 acres",
  });

  const handleDataExtracted = (data: ExtractedData, text: string) => {
    setExtractedData(data);
    setExtractedTextData(text);
    setPropertyData((prevData) => ({
      ...prevData,
      propertyName:
        data.propertyOverview?.propertyName || prevData.propertyName,
      seller: data.tenantInfo?.mainTenant || prevData.seller,
      guidancePrice:
        data.financialMetrics?.askingPrice?.formatted || prevData.guidancePrice,
      guidancePricePSF:
        data.financialMetrics?.pricePerSF?.formatted ||
        prevData.guidancePricePSF,
      capRate: data.financialMetrics?.capRate
        ? `${data.financialMetrics.capRate}%`
        : prevData.capRate,
      propertySize: data.propertyDetails?.totalArea || prevData.propertySize,
      landArea: data.propertyDetails?.siteArea || prevData.landArea,
    }));
  };

  const handleExportToExcel = () => {
    // Create a sample Excel file with location analysis data
    const data = {
      propertyName: "280 Richards, Brooklyn, NY",
      seller: "Thor Equities",
      guidancePrice: "$143,000,000",
      guidancePricePSF: "$23.92",
      capRate: "5.0%",
      propertySize: "312,000 sqft",
      landArea: "16 acres",
    };

    // Convert data to CSV format
    const headers = Object.keys(data).join(",");
    const values = Object.values(data).join(",");
    const csv = `${headers}\n${values}`;

    // Create a Blob and download it
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "280_Richards_Location_Analysis.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(16);
    doc.text("280 Richards, Brooklyn, NY - Location Analysis", 20, 20);

    // Add property details
    doc.setFontSize(12);
    doc.text("Property Details:", 20, 40);
    doc.setFontSize(10);
    doc.text(`Seller: Thor Equities`, 30, 50);
    doc.text(`Guidance Price: $143,000,000`, 30, 60);
    doc.text(`Guidance Price PSF: $23.92`, 30, 70);
    doc.text(`Cap Rate: 5.0%`, 30, 80);
    doc.text(`Property Size: 312,000 sqft`, 30, 90);
    doc.text(`Land Area: 16 acres`, 30, 100);

    doc.save("280-richards-location-analysis.pdf");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background shadow-sm">
        <div className="container px-4 sm:px-6 py-3 mx-auto max-w-7xl">
          {/* Back button - now outside the navigation */}
          <div className="flex items-center mb-3 md:mb-1">
            <Link href="/deal-overview" className="flex items-center">
              <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
              <span className="ml-2 text-sm font-medium md:hidden">
                Back to Deal Overview
              </span>
            </Link>
          </div>

          {/* Navigation - desktop and mobile */}
          <div className="flex items-center justify-between h-10">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-sm font-medium text-black transition-colors hover:text-primary"
              >
                Deal Overview
              </Link>
              <Link
                href="/workshop"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Workshop
              </Link>
              <Link
                href="/pipeline"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pipeline
              </Link>
              <Link
                href="/settings"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Settings
              </Link>
            </nav>

            {/* Mobile Navigation - Hamburger Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-semibold">Navigation</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-5">
                    <Link
                      href="/deal-overview"
                      className="text-sm font-medium py-2 hover:bg-muted px-2 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Deal Overview
                    </Link>
                    <Link
                      href="/workshop"
                      className="text-sm font-medium py-2 hover:bg-muted px-2 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Workshop
                    </Link>
                    <Link
                      href="/pipeline"
                      className="text-sm font-medium py-2 hover:bg-muted px-2 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pipeline
                    </Link>
                    <Link
                      href="/settings"
                      className="text-sm font-medium py-2 hover:bg-muted px-2 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </nav>

                  {/* Mobile Search */}
                  <div className="mt-8">
                    <h3 className="text-sm font-medium mb-2">Search</h3>
                    <input
                      type="text"
                      placeholder="Ask me anything"
                      className="w-full h-10 rounded-full border border-input bg-background px-4 py-2 text-sm shadow-sm transition-colors"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Ask me anything"
                  className="h-9 w-[250px] rounded-full border border-input bg-background px-4 py-1 text-sm shadow-sm transition-colors"
                />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-xs font-medium" title="zero - my initial">
                  Z0
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 py-10 mx-auto max-w-7xl">
          {/* Page Title and Model Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Deal Overview
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                Underwriting Model
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex h-9 items-center rounded-md border px-4 text-xs cursor-pointer">
                    {selectedModel}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedModel("Industrial.Template.v2.4.xlsx")
                    }
                  >
                    Industrial.Template.v2.4.xlsx
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedModel("Industrial.Template.v2.3.xlsx")
                    }
                  >
                    Industrial.Template.v2.3.xlsx
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setSelectedModel("Office.Template.v1.2.xlsx")
                    }
                  >
                    Office.Template.v1.2.xlsx
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-10">
            {/* Hero Section (Map + Deal Info) */}
            <div className="mt-4">
              <PdfUpload onDataExtracted={handleDataExtracted} />
            </div>
            {extractedData && <UploadDate />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="pt-8">
                <ToggleableContent title="PDF Extracted Text">
                  <div className="whitespace-pre-wrap font-mono text-sm">
                    {extractedTextData}
                  </div>
                </ToggleableContent>
              </div>

              <div className="pt-8">
                <ToggleableContent title="JSON Data">
                  <JsonViewer data={extractedData} />
                </ToggleableContent>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Left: Map/Property Image (60%) */}
              <div className="h-full md:col-span-3 relative rounded-lg overflow-hidden shadow-sm">
                <iframe
                  title="Simple Map"
                  className="w-full h-full rounded-md border"
                  src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs text-center">
                  <Link
                    href="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc="
                    target="_blank"
                    className="flex items-center justify-center"
                  >
                    Click for Google Street View
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Right: Deal Info (40%) */}
              <div className="md:col-span-2 flex flex-col bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-xl font-bold">
                    {propertyData.propertyName}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {extractedData?.propertyOverview?.propertyType ||
                      "Industrial"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div>
                    <div className="text-xs text-muted-foreground">Seller</div>
                    <div className="font-medium">{propertyData.seller}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Guidance Price
                    </div>
                    <div className="font-medium">
                      {propertyData.guidancePrice}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Guidance Price PSF
                    </div>
                    <div className="font-medium">
                      {propertyData.guidancePricePSF}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Cap Rate
                    </div>
                    <div className="font-medium">{propertyData.capRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Property Size
                    </div>
                    <div className="font-medium">
                      {propertyData.propertySize}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Land Area
                    </div>
                    <div className="font-medium">{propertyData.landArea}</div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black text-white hover:bg-black/80 hover:text-white"
                    onClick={handleExportToExcel}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGeneratePDF}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export to Pdf
                  </Button>
                </div>
              </div>
            </div>

            {/* extracted additional data */}
            <div className="grid grid-cols-1 ">
              {extractedData && (
                <div className="mt-4 space-y-4 rounded-lg border bg-background p-4 bg-blue-50">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Property Type
                        </label>
                        <p className="text-sm font-medium">
                          {extractedData.propertyOverview.propertyType || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Location
                        </label>
                        <p className="text-sm font-medium">
                          {extractedData.propertyOverview.location || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs text-muted-foreground">
                      Financial Metrics
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">
                          NOI
                        </label>

                        <p
                          className="text-sm font-medium"
                          title={String(
                            extractedData.financialMetrics.noi?.value
                          )}
                        >
                          {formatCurrency(
                            extractedData.financialMetrics.noi?.value
                          ) || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Cap Rate
                        </label>
                        <p className="text-sm font-medium">
                          {extractedData.financialMetrics.capRate
                            ? `${extractedData.financialMetrics.capRate}%`
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Occupancy
                        </label>
                        <p className="text-sm font-medium">
                          {extractedData.financialMetrics.occupancy
                            ? `${extractedData.financialMetrics.occupancy}%`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* contact details data - pdf extracted */}
            {extractedData?.financingContacts &&
              extractedData?.financingContacts.length > 0 && (
                <div className="bg-blue-50 p-4">
                  <h1 className="text-2xl text-gray-600 mb-4 font-bold">
                    Capital Market Contacts
                  </h1>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {extractedData?.financingContacts?.map((c, i) => (
                      <ContactCard key={c.email} data={c} index={i} />
                    ))}
                  </div>
                </div>
              )}

            {/* Summary Section (Deal Summary + Asset-Level Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Deal Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Location Summary</h2>
                <p className="text-sm leading-relaxed">
                  {extractedData?.propertyOverview?.description ||
                    "280 Richards is strategically located in Brooklyn's Red Hook district, a rapidly developing industrial and logistics hub."}
                </p>

                <h3 className="text-md font-semibold mt-6 mb-3">
                  Market Highlights
                </h3>
                <ul className="text-sm list-disc pl-5 space-y-2">
                  {extractedData?.marketInfo?.marketHighlights?.map(
                    (highlight, index) => <li key={index}>{highlight}</li>
                  ) ||
                    extractedData?.investmentHighlights
                      ?.slice(0, 3)
                      ?.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      )) ||
                    [
                      "Prime location in Brooklyn's growing logistics hub",
                      "Excellent connectivity to Manhattan and major highways",
                      "Strong market fundamentals with increasing demand",
                    ].map((text, index) => <li key={index}>{text}</li>)}
                </ul>

                {extractedData?.marketInfo?.demographics && (
                  <>
                    <h3 className="text-md font-semibold mt-6 mb-3">
                      Demographics
                    </h3>
                    <ul className="text-sm list-disc pl-5 space-y-2">
                      {extractedData.marketInfo.demographics.population && (
                        <li>
                          Population:{" "}
                          {extractedData.marketInfo.demographics.population}
                        </li>
                      )}
                      {extractedData.marketInfo.demographics
                        .householdIncome && (
                        <li>
                          Household Income:{" "}
                          {
                            extractedData.marketInfo.demographics
                              .householdIncome
                          }
                        </li>
                      )}
                      {extractedData.marketInfo.demographics.laborForce && (
                        <li>
                          Labor Force:{" "}
                          {extractedData.marketInfo.demographics.laborForce}
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Right: Asset-Level Data */}
              <AssetLevelData data={extractedData} />
            </div>

            {/* Extended Deal Data Section (4 Data Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FinancialMetrics
                data={
                  extractedData?.financialMetrics
                    ? { financialMetrics: extractedData.financialMetrics }
                    : undefined
                }
              />
              <KeyAssumptions
                data={
                  extractedData
                    ? {
                        propertyDetails: extractedData.propertyDetails,
                        financialMetrics: extractedData.financialMetrics,
                      }
                    : undefined
                }
              />
              <MarketAnalysis
                data={
                  extractedData?.marketInfo
                    ? { marketInfo: extractedData.marketInfo }
                    : undefined
                }
              />
              <LeaseAnalysis
                data={
                  extractedData
                    ? {
                        tenantInfo: extractedData.tenantInfo,
                        financialMetrics: extractedData.financialMetrics,
                      }
                    : undefined
                }
              />
            </div>

            {/* Financial Analysis Section */}
            <div className="space-y-8">
              {/* {extractedData?.salesComparables && ( */}
              <LandSaleComparables
                data={
                  extractedData
                    ? { salesComparables: extractedData.salesComparables }
                    : undefined
                }
              />
              {/* )} */}
              <div>
                <ProFormaAnalysis
                  data={
                    extractedData
                      ? { proForma: extractedData.proForma }
                      : undefined
                  }
                />
              </div>
            </div>

            {/* Location Intelligence Section */}
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
              {/* Left: Supply Pipeline (30%) */}
              <div className="md:col-span-3">
                <SupplyPipeline />
              </div>
              {/* Right: Land Sale Comparables (70%) */}
              <div className="md:col-span-7">
                <LandSaleComparablesStatic />
              </div>
            </div>

            {/* Extra Analytical Panels */}
            <div className="space-y-10">
              {/* <DemographicTrends /> */}
              <DemographicPage />
              <ProximityInsights />
              <ZoningOverlays />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
