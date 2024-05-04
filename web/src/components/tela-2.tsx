import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function ListItems() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Catálogo de Produtos
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Encontre os melhores produtos para você.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 1"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Smartphone Moderno</h3>
              <p className="text-sm text-gray-500">
                Tela OLED, 5G, Câmera Tripla
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$1.499,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 2"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Tênis Esportivo</h3>
              <p className="text-sm text-gray-500">
                Amortecimento de alto impacto
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$249,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 3"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Câmera Profissional</h3>
              <p className="text-sm text-gray-500">
                Resolução 4K, Lentes intercambiáveis
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$2.999,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 4"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Relógio Inteligente</h3>
              <p className="text-sm text-gray-500">
                Monitoramento de atividades, GPS
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$499,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 5"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Camiseta Esportiva</h3>
              <p className="text-sm text-gray-500">
                Tecido respirável, secagem rápida
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$79,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 6"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Fone de Ouvido Bluetooth</h3>
              <p className="text-sm text-gray-500">
                Cancelamento de ruído, 20h de bateria
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$299,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 7"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Mochila de Viagem</h3>
              <p className="text-sm text-gray-500">
                Compartimentos organizados, resistente
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$149,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Produto 8"
              className="object-cover w-full h-64"
              height={400}
              src="https://picsum.photos/200"
              style={{
                aspectRatio: '500/400',
                objectFit: 'cover',
              }}
              width={500}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-bold text-xl">Bicicleta Elétrica</h3>
              <p className="text-sm text-gray-500">
                Alcance de 40km, Bateria removível
              </p>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg md:text-xl">R$3.999,99</h4>
                <Button size="sm">Comprar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
