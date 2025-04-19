import { ExternalLink } from "lucide-react"
import Link from "next/link"

type ZoningOverlay = {
  id: string
  code: string
  name: string
  description: string
  allowedUses: string[]
  maxFAR: string
  maxHeight: string
  setbacks: string
  parkingReq: string
  municipalLink: string
}

const zoningOverlays: ZoningOverlay[] = [
  {
    id: "1",
    code: "M-2",
    name: "Medium Manufacturing",
    description: "Designated for medium manufacturing uses with moderate noise, vibration, and emissions.",
    allowedUses: ["Manufacturing", "Warehousing", "Distribution", "Office (accessory)"],
    maxFAR: "2.0",
    maxHeight: "60 ft",
    setbacks: "15 ft front, 20 ft rear",
    parkingReq: "1 space per 1,000 sqft",
    municipalLink: "https://www.nyc.gov/site/planning/zoning/districts-tools/m2.page",
  },
  {
    id: "2",
    code: "M1-1",
    name: "Light Manufacturing",
    description:
      "Light manufacturing district that serves as a buffer between residential/commercial areas and heavier industrial zones.",
    allowedUses: ["Light Manufacturing", "Warehousing", "Office", "Limited Retail"],
    maxFAR: "1.0",
    maxHeight: "30 ft",
    setbacks: "15 ft front, 20 ft rear",
    parkingReq: "1 space per 800 sqft",
    municipalLink: "https://www.nyc.gov/site/planning/zoning/districts-tools/m1.page",
  },
]

export function ZoningOverlays() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Zoning Overlays</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {zoningOverlays.map((zoning) => (
          <div key={zoning.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-medium">{zoning.code}</h3>
                <p className="text-xs text-muted-foreground">{zoning.name}</p>
              </div>
              <Link
                href={zoning.municipalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-primary hover:underline"
              >
                Municipal Reference
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>

            <p className="text-xs mb-3">{zoning.description}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <p className="text-muted-foreground">Max FAR:</p>
                <p className="font-medium">{zoning.maxFAR}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Height:</p>
                <p className="font-medium">{zoning.maxHeight}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Setbacks:</p>
                <p className="font-medium">{zoning.setbacks}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Parking Req:</p>
                <p className="font-medium">{zoning.parkingReq}</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Allowed Uses:</p>
              <div className="flex flex-wrap gap-1">
                {zoning.allowedUses.map((use, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
