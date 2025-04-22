"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ToggleableContentProps {
  title: string;
  children: React.ReactNode;
}

export function ToggleableContent({ title, children }: ToggleableContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
          <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2">
        <div className="border rounded-md bg-card">
          <ScrollArea className="h-[500px]">
            <div className="p-4">{children}</div>
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
