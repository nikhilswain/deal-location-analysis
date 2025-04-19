import React from "react";
import { cn } from "@/lib/utils";

interface DataPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

const DataPanel = ({
  title,
  children,
  className,
  collapsible = false,
}: DataPanelProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn("bg-white rounded-md shadow-sm overflow-hidden", className)}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {isCollapsed ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 8L18 14H6L12 8Z" fill="#6B7280" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 16L6 10H18L12 16Z" fill="#6B7280" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className={cn("p-5", { hidden: isCollapsed })}>{children}</div>
    </div>
  );
};

export default DataPanel;
