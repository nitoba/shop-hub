import { Button } from './ui/button'

type Props = {
  name: string
  priceInCents: number
  onClickPurchase: () => void
}

export function ProductCard({ name, priceInCents, onClickPurchase }: Props) {
  return (
    <div className="relative group ring-2 ring-border rounded-md hover:ring-slate-300 transition-all duration-300">
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
          <Button size="sm" onClick={onClickPurchase}>
            Comprar
          </Button>
        </div>
      </div>
    </div>
  )
}
