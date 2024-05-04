import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

type Props = {
  name: string
  priceInCents: number
}

export function ProductCard({ name, priceInCents }: Props) {
  return (
    <div className="relative group ring-2 ring-border rounded-md hover:ring-slate-300 transition-all duration-300">
      <Link className="absolute inset-0 z-10" to="#">
        <span className="sr-only">View product</span>
      </Link>
      <img
        alt="Product image"
        className="rounded-t-lg object-cover w-full aspect-square transition-opacity"
        height={300}
        src="https://picsum.photos/300"
        width={300}
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold tracking-tight">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {(priceInCents / 1000).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <Button size="sm">Comprar</Button>
        </div>
      </div>
    </div>
  )
}

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
