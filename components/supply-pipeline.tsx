import Image from "next/image";

type Development = {
  id: string;
  image: string;
  address: string;
  submarket: string;
  propertyType: string;
  size: string;
  constructionStart: string;
  deliveryDate: string;
  tenants: string[];
};

const developments: Development[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=80&width=120",
    address: "640 Columbia Street",
    submarket: "Brooklyn",
    propertyType: "Warehouse-Distribution",
    size: "336,350 sqft",
    constructionStart: "Q2 2023",
    deliveryDate: "Jun-25",
    tenants: ["Pending"],
  },
  {
    id: "2",
    image: "/placeholder.svg?height=80&width=120",
    address: "WB Mason Distribution",
    submarket: "Bronx",
    propertyType: "Last-Mile Delivery",
    size: "150,000 sqft",
    constructionStart: "Q1 2023",
    deliveryDate: "May-25",
    tenants: ["WB Mason"],
  },
];

export function SupplyPipeline() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm h-full border-r border-gray-100 md:border-r-0 lg:border-r">
      <h2 className="text-lg font-semibold mb-4">Supply Pipeline</h2>

      <div className="space-y-5">
        {developments.map((development) => (
          <div
            key={development.id}
            className="flex md:flex-col lg:flex-row items-center shadow-sm rounded-md overflow-hidden"
          >
            <div className="relative h-[80px] w-[120px]  md:h-[100px] md:w-full lg:h-[100px] lg:w-[120px] flex-shrink-0">
              <Image
                src={development.image || "/placeholder.svg"}
                alt={development.address}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-3 flex-1">
              <h3 className="font-medium text-sm">{development.address}</h3>
              <p className="text-xs text-muted-foreground">
                {development.submarket}
              </p>

              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  <span className="font-medium">
                    {development.propertyType}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>{" "}
                  <span className="font-medium">{development.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Delivery:</span>{" "}
                  <span className="font-medium">
                    {development.deliveryDate}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tenants:</span>{" "}
                  <span className="font-medium">
                    {development.tenants.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
