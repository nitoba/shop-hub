import { FetchItemsResponse } from '@/services/fetch-items'
import { ProductCard } from './product-card'
import { useNavigate } from 'react-router-dom'

type Props = {
  items: FetchItemsResponse
}

export function ListItems({ items }: Props) {
  const navigate = useNavigate()

  function handleNavigateToOrderPage(
    productId: string,
    type: 'service' | 'product',
  ) {
    navigate(`/orders/${productId}/${type}`)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Catálogo de produtos
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Encontre produtos e serviços perfeitos para você. Busque em nossa
              acuradas categorias e descubra todas as possibilidades.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">Serviços</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.services.off_one.map(({ id, name, priceInCents }) => (
                <ProductCard
                  key={id}
                  name={name}
                  priceInCents={priceInCents}
                  onClickPurchase={() =>
                    handleNavigateToOrderPage(id, 'service')
                  }
                />
              ))}

              {items.services.internet.map(({ id, name, priceInCents }) => (
                <ProductCard
                  key={id}
                  name={name}
                  priceInCents={priceInCents}
                  onClickPurchase={() =>
                    handleNavigateToOrderPage(id, 'service')
                  }
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">Produtos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.products.map(({ id, name, priceInCents }) => (
                <ProductCard
                  key={id}
                  name={name}
                  priceInCents={priceInCents}
                  onClickPurchase={() =>
                    handleNavigateToOrderPage(id, 'product')
                  }
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">Combos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.services.packages.map(({ id, name, priceInCents }) => (
                <ProductCard
                  key={id}
                  name={name}
                  priceInCents={priceInCents}
                  onClickPurchase={() =>
                    handleNavigateToOrderPage(id, 'service')
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
