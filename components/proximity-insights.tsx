import type React from "react"
import { Building2, Car, Factory, Landmark, MapPin, Ship, Train, Truck } from "lucide-react"

type ProximityItem = {
  id: string
  name: string
  type: string
  distance: string
  travelTime: string
  icon: React.ReactNode
}

const proximityItems: ProximityItem[] = [
  {
    id: "1",
    name: "I-278 (Brooklyn-Queens Expressway)",
    type: "Highway",
    distance: "0.3 miles",
    travelTime: "2 min",
    icon: <Car className="h-5 w-5" />,
  },
  {
    id: "2",
    name: "Red Hook Container Terminal",
    type: "Port",
    distance: "1.2 miles",
    travelTime: "6 min",
    icon: <Ship className="h-5 w-5" />,
  },
  {
    id: "3",
    name: "Amazon Fulfillment Center",
    type: "Major Tenant",
    distance: "2.5 miles",
    travelTime: "12 min",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: "4",
    name: "Bay Ridge Branch Rail Line",
    type: "Rail",
    distance: "0.8 miles",
    travelTime: "5 min",
    icon: <Train className="h-5 w-5" />,
  },
  {
    id: "5",
    name: "Brooklyn Navy Yard",
    type: "Industrial Hub",
    distance: "3.1 miles",
    travelTime: "15 min",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    id: "6",
    name: "Manhattan Financial District",
    type: "Business District",
    distance: "4.7 miles",
    travelTime: "22 min",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "7",
    name: "JFK International Airport",
    type: "Airport",
    distance: "12.5 miles",
    travelTime: "35 min",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: "8",
    name: "Hunts Point Food Distribution Center",
    type: "Distribution Hub",
    distance: "8.3 miles",
    travelTime: "25 min",
    icon: <Truck className="h-5 w-5" />,
  },
]

export function ProximityInsights() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Proximity Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {proximityItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">{item.icon}</div>
              <div>
                <p className="text-xs font-medium">{item.type}</p>
              </div>
            </div>

            <h3 className="text-sm font-medium mb-2 line-clamp-2">{item.name}</h3>

            <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Distance</p>
                <p className="font-medium">{item.distance}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Travel Time</p>
                <p className="font-medium">{item.travelTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
