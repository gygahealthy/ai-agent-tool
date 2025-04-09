import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link
              href={item.href}
              className={cn(
                "hover:text-primary transition-colors",
                index === items.length - 1 && "font-medium"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 