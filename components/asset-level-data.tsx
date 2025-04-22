"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssetLevelDataProps {
  data?: any;
}

export function AssetLevelData({ data }: AssetLevelDataProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Asset Level Data</CardTitle>
        <CardDescription>Physical property characteristics</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid gap-4">
            {/* Building Specifications */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                Building Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Building Size
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.totalArea || "312,000 SF"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Land Area</div>
                  <div className="font-medium">
                    {data?.propertyDetails?.siteArea || "16 acres"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Year Built
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.yearBuilt || "1975"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Building Class
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.buildingClass || "B"}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Specifications */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                Loading Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Clear Height
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.clearHeight || "32'"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Dock Doors
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.dockDoors?.count || "45"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Drive-In Doors
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.driveInDoors || "2"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Column Spacing
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.columnSpacing || "40' x 40'"}
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Access */}
            <div>
              <h3 className="text-sm font-medium mb-2">Parking & Access</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Parking Spaces
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.parking?.spaces || "150"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Parking Ratio
                  </div>
                  <div className="font-medium">
                    {data?.propertyDetails?.parking?.ratio || "0.5/1,000 SF"}
                  </div>
                </div>
              </div>
            </div>

            {/* Tenant Information */}
            <div>
              <h3 className="text-sm font-medium mb-2">Tenant Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Primary Tenant
                  </div>
                  <div className="font-medium">
                    {data?.tenantInfo?.mainTenant || "Amazon"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Lease Type
                  </div>
                  <div className="font-medium">
                    {data?.tenantInfo?.leaseType || "NNN"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Term Length
                  </div>
                  <div className="font-medium">
                    {data?.tenantInfo?.termLength || "15 years"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Credit Rating
                  </div>
                  <div className="font-medium">
                    {data?.tenantInfo?.creditRating || "AA"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
