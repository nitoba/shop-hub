import { ListItemsLoading } from '@/components/loading-list-items'
import { SearchForm } from '@/components/search-form'
import { ListItems } from '@/components/list-items'
import { useFetchItems } from '@/hooks/useFetchItems'

export function HomePage() {
  const { items, isLoading, handleSearchItems } = useFetchItems()
  return (
    <div className="relative overflow-hidden py-24 lg:py-32">
      {/* Gradients */}
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-background/50 to-foreground blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
      </div>
      {/* End Gradients */}
      <div className="relative z-10">
        <div className="container py-10 lg:py-16">
          <div className="max-w-2xl text-center mx-auto">
            <p className="">Serviços e Produtos</p>
            {/* Title */}
            <div className="mt-5 max-w-2xl">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Shop Hub
              </h1>
            </div>
            {/* End Title */}
            <div className="mt-5 max-w-3xl">
              <p className="text-xl text-muted-foreground">
                Há mais de 10 anos no mercado entregando garantia, soluções e
                comodidade aos nossos clientes
              </p>
            </div>
            {/* Form */}
            <SearchForm onSubmitSearch={handleSearchItems} />
            {/* End Form */}
          </div>
          {!items && isLoading && <ListItemsLoading />}
          {items && !isLoading && <ListItems items={items} />}
        </div>
      </div>
    </div>
  )
}
