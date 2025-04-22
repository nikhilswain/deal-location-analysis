// components/ContactCard.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Contact } from "@/types";

interface ContactCardProps {
  data: Contact;
  index: number;
}

export function ContactCard({ data, index }: ContactCardProps) {
  const bgColors = [
    "bg-gradient-to-br from-violet-100 to-purple-50 hover:from-violet-200 hover:to-purple-100",
    "bg-gradient-to-br from-blue-100 to-indigo-50 hover:from-blue-200 hover:to-indigo-100",
    "bg-gradient-to-br from-emerald-100 to-teal-50 hover:from-emerald-200 hover:to-teal-100",
    "bg-gradient-to-br from-amber-100 to-yellow-50 hover:from-amber-200 hover:to-yellow-100",
  ];
  const currentBg = bgColors[index % bgColors.length];

  // explicitly type `n` as a string
  const initials = data.name
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 p-6 ${currentBg} border-0 shadow-md hover:shadow-xl group`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-12 -mt-12 backdrop-blur-sm" />

      {/* Avatar + Name */}
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-12 w-12 bg-primary text-primary-foreground shadow">
          <AvatarFallback className="font-semibold text-gray-600">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {data.name.charAt(0) + data.name.slice(1).toLowerCase()}
          </h3>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm font-normal text-xs"
          >
            {data.title}
          </Badge>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-3 mt-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${data.email}`}
                  className="text-sm hover:underline truncate"
                >
                  {data.email}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send email</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${data.phone}`}
                  className="text-sm hover:underline"
                >
                  {data.phone}
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call contact</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="h-5 w-5 text-primary" />
      </div>
    </Card>
  );
}
