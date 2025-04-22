export interface ExtractedData {
  propertyOverview: {
    propertyType: string | undefined;
    propertyName: string | undefined;
    location: string | undefined;
    description: string | undefined;
  };
  propertyDetails: {
    yearBuilt: string | undefined;
    clearHeight: string | undefined;
    totalArea: string | undefined;
    siteArea: string | undefined;
    buildingClass: string | undefined;
    construction: string | undefined;
    sprinkler: string | undefined;
    dockDoors: {
      count: number | undefined;
      description: string | undefined;
    };
    driveInDoors: number | undefined;
    parking: {
      spaces: number | undefined;
      ratio: string | undefined;
    };
    columnSpacing: string | undefined;
  };
  financialMetrics: {
    askingPrice: {
      value: number | undefined;
      formatted: string | undefined;
    };
    pricePerSF: {
      value: number | undefined;
      formatted: string | undefined;
    };
    noi: {
      value: number | undefined;
      formatted: string | undefined;
    };
    capRate: number | undefined;
    occupancy: number | undefined;
    stabilizedNOI: {
      value: number | undefined;
      formatted: string | undefined;
    };
    operatingExpenses: {
      value: number | undefined;
      formatted: string | undefined;
    };
  };
  tenantInfo: {
    mainTenant: string | undefined;
    leaseType: string | undefined;
    termLength: string | undefined;
    creditRating: string | undefined;
    buildingUsers: string[];
  };
  marketInfo: {
    submarket: string | undefined;
    marketHighlights: string[];
    demographics: {
      population: string | undefined;
      householdIncome: string | undefined;
      laborForce: string | undefined;
    };
    transport: {
      highways: string[];
      ports: string[];
      distances: string[];
    };
  };
  investmentHighlights: string[];
  salesComparables: SaleComparable[];
  proForma?: ProForma;
}

export interface SaleComparable {
  date: string;
  propertyName: string;
  tenant: string;
  market: string;
  size: string;
  totalPrice: string;
  pricePerSqFt: string;
  capRate: number;
  purchaser: string;
  seller: string;
}

export interface ProFormaYear {
  ending: string;
  scheduledBaseRent?: number;
  totalRentalRevenue?: number;
  totalOtherTenantRevenue?: number;
  effectiveGrossRevenue?: number;
  realEstateTaxes?: number;
  managementFee?: number;
  landlordInsurance?: number;
  cam?: number;
  totalOperatingExpenses?: number;
  netOperatingIncome?: number;
}

export interface ProForma {
  assumptions: {
    rentGrowth?: number;
    opexGrowth?: number;
    taxGrowth?: number;
    terminalCapRate?: number;
  };
  years: ProFormaYear[];
}
