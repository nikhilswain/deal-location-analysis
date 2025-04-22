import Image from "next/image";

type LandSale = {
  id: string;
  image: string;
  address: string;
  submarket: string;
  date: string;
  size: string;
  pricePerSqFt: string;
  totalPrice: string;
  zoning: string;
  owner: string;
  tenant?: string;
};

const landSales: LandSale[] = [
  {
    id: "1",
    image: "/images/image-2.png",
    address: "Baylis 495 Business Park",
    submarket: "Melville, NY",
    date: "May-24",
    size: "103,500 sqft",
    pricePerSqFt: "$425",
    totalPrice: "$44,000,000",
    zoning: "M-2",
    owner: "Bethel Green",
    tenant: "Dr. Pepper",
  },
  {
    id: "2",
    image: "/images/image-3.png",
    address: "1 Debaun Road",
    submarket: "Millstone, NJ",
    date: "Jun-24",
    size: "132,930 sqft",
    pricePerSqFt: "$312",
    totalPrice: "$41,903,580",
    zoning: "I-3",
    owner: "Cabot",
    tenant: "Berry Plastics",
  },
  {
    id: "3",
    image: "/images/image-4.png",
    address: "39 Edgeboro Road",
    submarket: "Millstone, NJ",
    date: "Oct-23",
    size: "513,240 sqft",
    pricePerSqFt: "$323",
    totalPrice: "$165,776,520",
    zoning: "I-3",
    owner: "Blackstone",
    tenant: "FedEx",
  },
  {
    id: "4",
    image: "/images/image-5.png",
    address: "Terminal Logistics Center",
    submarket: "Queens, NY",
    date: "Mar-23",
    size: "336,000 sqft",
    pricePerSqFt: "$405",
    totalPrice: "$136,000,000",
    zoning: "M1-1",
    owner: "Goldman",
    tenant: "Do & Co",
  },
];

export function LandSaleComparablesStatic() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-4">Land Sale Comparables</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {landSales.map((sale) => (
          <div
            key={sale.id}
            className="flex md:flex-col lg:flex-row items-center shadow-sm rounded-md overflow-hidden"
          >
            <div className="relative h-[80px] w-[120px] md:h-[100px] md:w-full lg:h-[100px] lg:w-[120px] flex-shrink-0">
              <Image
                src={sale.image || "/placeholder.svg"}
                alt={sale.address}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-3 flex-1">
              <h3 className="font-medium text-sm">{sale.address}</h3>
              <p className="text-xs text-muted-foreground">
                {sale.submarket} • {sale.date}
              </p>

              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Size:</span>{" "}
                  <span className="font-medium">{sale.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price/SF:</span>{" "}
                  <span className="font-medium">{sale.pricePerSqFt}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total:</span>{" "}
                  <span className="font-medium">{sale.totalPrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Owner:</span>{" "}
                  <span className="font-medium">{sale.owner}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
