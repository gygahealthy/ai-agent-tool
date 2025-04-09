"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/lib/utils";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleUnselect = (option: Option) => {
    onChange(value.filter((item) => item.value !== option.value));
  };

  const handleSelect = (option: Option) => {
    const isSelected = value.some((item) => item.value === option.value);
    onChange(isSelected ? value.filter((item) => item.value !== option.value) : [...value, option]);
  };

  const handleClearAll = () => {
    onChange([]);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex gap-2">
        <div
          className={cn(
            "relative flex min-h-9 flex-1 cursor-pointer rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {value.map((option) => (
              <Badge key={option.value} variant="outline" className="rounded-sm px-1 font-normal">
                {option.label}
                <button
                  className="ml-1 rounded-sm hover:bg-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(option);
                  }}
                >
                  ×
                </button>
              </Badge>
            ))}
            {value.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
          </div>
        </div>
        {value.length > 0 && (
          <button
            onClick={handleClearAll}
            className="h-9 rounded-md border border-input px-2 py-1 text-xs transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = value.some((item) => item.value === option.value);
              return (
                <div
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                    isSelected && "bg-secondary/50"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
