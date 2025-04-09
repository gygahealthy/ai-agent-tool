export function PackageSkeleton() {
  return (
    <div className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-4 w-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-4 h-4 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 sm:mt-0" />
        </div>

        {/* Tabs Skeleton */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex animate-pulse flex-col rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              {/* Card Header */}
              <div className="mb-4 h-6 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />

              {/* Price */}
              <div className="mb-6 h-8 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />

              {/* Features */}
              {[1, 2, 3].map((j) => (
                <div key={j} className="mb-2 h-4 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              ))}

              {/* Button */}
              <div className="mt-4 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
