import { Skeleton } from './ui/skeleton'

export function LoadingSummaryOrder() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[40%]" />
      <Skeleton className="space-y-10 p-6 h-fit">
        <div className="flex items-center justify-between">
          <Skeleton className="w-[70%] h-8" />
          <Skeleton className="w-[20%] h-8" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="size-16" />
              <div className="space-y-3">
                <Skeleton className="w-32 h-3" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
            <Skeleton className="w-[22%] h-8" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="w-[37%] h-8" />
            <Skeleton className="w-[20%] h-8" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="w-[20%] h-8" />
          <Skeleton className="w-[25%] h-8" />
        </div>
      </Skeleton>
    </div>
  )
}
