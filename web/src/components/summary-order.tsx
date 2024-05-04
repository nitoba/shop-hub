import { useQuery } from '@tanstack/react-query'
import { Separator } from './ui/separator'
import { getItemById } from '@/services/get-item-by-id'
import { useParams } from 'react-router-dom'
import { LoadingSummaryOrder } from './loading-summary-order'

type Params = { itemId: string; type: string }

export function SummaryOrder() {
  const { itemId, type } = useParams<Params>()

  console.log({ itemId, type })

  const { data, isLoading } = useQuery({
    queryKey: ['orders', itemId],
    queryFn: () => getItemById({ itemId: itemId!, type: type! }),
    enabled: !!itemId && !!type,
  })

  if (!data && isLoading) {
    return <LoadingSummaryOrder />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resumo do pedido</h1>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Items do pedido</h2>
          <span className="text-gray-500">1 item</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                alt="Product Image"
                className="rounded-md"
                height={64}
                src="https://picsum.photos/100"
                style={{
                  aspectRatio: '64/64',
                  objectFit: 'cover',
                }}
                width={64}
              />
              <div>
                <h3 className="font-medium">{data!.name}</h3>
              </div>
            </div>
            <span className="font-medium">
              {(data!.priceInCents / 1000).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Subtotal</h2>
          <span className="font-medium">
            {(data!.priceInCents / 1000).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Taxas</h2>
          <span className="font-medium">R$ 0</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Total</h2>
          <span className="text-2xl font-bold">
            {(data!.priceInCents / 1000).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
