import { Skeleton } from './ui/skeleton'

export function ListItemsLoading() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <Skeleton className="w-56 h-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="flex flex-col" key={index}>
            <Skeleton className="w-full h-[300px] rounded-t-lg" />
            <div className="flex flex-col gap-2 p-4">
              <Skeleton className="w-36 h-4" />
              <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-32 h-10" />
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  )
}
