import { ScrollArea } from "@/components/ui/scroll-area";
import { JSX } from "react";

interface JsonViewerProps {
  data: any;
}

const getValueColor = (value: any): string => {
  if (typeof value === "string") return "text-green-600 dark:text-green-400";
  if (typeof value === "number") return "text-blue-600 dark:text-blue-400";
  if (typeof value === "boolean") return "text-purple-600 dark:text-purple-400";
  if (value === null) return "text-gray-600 dark:text-gray-400";
  return "text-gray-900 dark:text-gray-100";
};

const renderJson = (obj: any, level = 0): JSX.Element => {
  const indent = "  ".repeat(level);

  if (Array.isArray(obj)) {
    return (
      <span>
        [
        {obj.length > 0 && (
          <>
            {"\n"}
            {obj.map((item, index) => (
              <span key={index}>
                {indent} {renderJson(item, level + 1)}
                {index < obj.length - 1 ? "," : ""}
                {"\n"}
              </span>
            ))}
            {indent}
          </>
        )}
        ]
      </span>
    );
  }

  if (obj && typeof obj === "object") {
    const entries = Object.entries(obj);
    return (
      <span>
        {"{"}
        {entries.length > 0 && (
          <>
            {"\n"}
            {entries.map(([key, value], index) => (
              <span key={key}>
                {indent}{" "}
                <span className="text-pink-600 dark:text-pink-400">
                  "{key}"
                </span>
                : {renderJson(value, level + 1)}
                {index < entries.length - 1 ? "," : ""}
                {"\n"}
              </span>
            ))}
            {indent}
          </>
        )}
        {"}"}
      </span>
    );
  }

  return (
    <span className={getValueColor(obj)}>
      {typeof obj === "string" ? `"${obj}"` : String(obj)}
    </span>
  );
};

export function JsonViewer({ data }: JsonViewerProps) {
  return (
    <div className="font-mono text-sm bg-white dark:bg-gray-900 rounded-lg p-4">
      {/* <ScrollArea className="h-[400px]"> */}
      <div className="whitespace-pre">{renderJson(data)}</div>
      {/* </ScrollArea> */}
    </div>
  );
}
