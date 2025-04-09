import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePackageFilter } from "@/components/providers/PackageFilterProvider";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LabelIcon from "@mui/icons-material/Label";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Separator } from "@/components/ui/seperator";
import { MultiSelect } from "@/components/ui/multi-select";

export function GCPackageFilters() {
  const {
    packages,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedTags,
    setSelectedTags,
    selectedDataVolumes,
    setSelectedDataVolumes,
    selectedPackageTypes,
    setSelectedPackageTypes,
  } = usePackageFilter();

  // Compute unique values
  const availableTags = Array.from(new Set(packages.flatMap((pkg) => pkg.tags)))
    .filter(Boolean)
    .sort();

  const availableDataVolumes = Array.from(new Set(packages.map((pkg) => pkg.dataVolume)))
    .filter(Boolean)
    .sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, "")) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, "")) || 0;
      return numA - numB;
    });

  const availablePackageTypes = Array.from(new Set(packages.map((pkg) => pkg.type)))
    .filter(Boolean)
    .sort();

  const toggleItem = (
    item: string,
    currentItems: string[],
    setItems: (value: string[]) => void
  ) => {
    setItems(
      currentItems.includes(item) ? currentItems.filter((i) => i !== item) : [...currentItems, item]
    );
  };

  return (
    <div className="sticky top-20 z-30 space-y-4 rounded-lg border bg-card p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50">
      {/* Search Filter */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <SearchIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-gray-400" />
          <h3 className="text-sm font-medium dark:text-gray-200">Tìm kiếm</h3>
        </div>
        <Input
          placeholder="Tìm gói cước..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 w-full dark:bg-gray-800 dark:text-gray-200"
        />
      </div>

      <Separator className="my-2 dark:border-gray-700" />

      {/* Price Range Filter */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <PaymentsIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-gray-400" />
          <h3 className="text-sm font-medium dark:text-gray-200">Khoảng giá</h3>
        </div>
        <Slider
          min={0}
          max={500000}
          step={10000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
          <span>{priceRange[0].toLocaleString()}đ</span>
          <span>{priceRange[1].toLocaleString()}đ</span>
        </div>
      </div>

      <Separator className="my-2 dark:border-gray-700" />

      {/* Package Type Filter */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <LocalOfferIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-gray-400" />
          <h3 className="text-sm font-medium dark:text-gray-200">Loại gói cước</h3>
        </div>
        <MultiSelect
          options={availablePackageTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          value={selectedPackageTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          onChange={(newValue) => setSelectedPackageTypes(newValue.map((item) => item.value))}
          className="w-full text-sm dark:bg-gray-800 dark:text-gray-200"
          placeholder="Chọn loại gói cước..."
        />
      </div>

      <Separator className="my-2 dark:border-gray-700" />

      {/* Data Volume Filter */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <DataUsageIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-gray-400" />
          <h3 className="text-sm font-medium dark:text-gray-200">Dung lượng data</h3>
        </div>
        <ScrollArea className="h-[150px] w-full rounded-md border p-1.5 dark:border-gray-700 dark:bg-gray-800/80">
          <div className="flex flex-wrap gap-1.5">
            {availableDataVolumes.map((volume) => (
              <Badge
                key={volume}
                variant={selectedDataVolumes.includes(volume) ? "default" : "outline"}
                className={`cursor-pointer py-0.5 text-xs transition-opacity hover:opacity-80 
                  ${
                    selectedDataVolumes.includes(volume)
                      ? "dark:bg-gray-700 dark:text-gray-200"
                      : "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  }`}
                onClick={() => toggleItem(volume, selectedDataVolumes, setSelectedDataVolumes)}
              >
                {volume}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="vertical" className="w-1 dark:bg-gray-700" />
        </ScrollArea>
      </div>

      <Separator className="my-2 dark:border-gray-700" />

      {/* Tags Filter */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <LabelIcon className="h-3.5 w-3.5 text-muted-foreground dark:text-gray-400" />
          <h3 className="text-sm font-medium dark:text-gray-200">Thẻ</h3>
        </div>
        <ScrollArea className="h-[200px] w-full rounded-md border p-1.5 dark:border-gray-700 dark:bg-gray-800/80">
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer py-0.5 text-xs transition-opacity hover:opacity-80 
                  ${
                    selectedTags.includes(tag)
                      ? "dark:bg-gray-700 dark:text-gray-200"
                      : "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  }`}
                onClick={() => toggleItem(tag, selectedTags, setSelectedTags)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="vertical" className="w-1 dark:bg-gray-700" />
        </ScrollArea>
      </div>
    </div>
  );
}
