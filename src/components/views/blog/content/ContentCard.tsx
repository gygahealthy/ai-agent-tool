import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  content: string;
  className?: string;
}

export const ContentCard = ({ title, content, className }: ContentCardProps) => (
  <div
    className={cn(
      "my-8 overflow-hidden rounded-lg border border-[#2E3338] bg-[#1E2329] shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
      className
    )}
  >
    <div className="p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{content}</p>
    </div>
  </div>
);