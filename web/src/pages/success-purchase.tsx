import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export default function SuccessPurchasePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="bg-green-100 dark:bg-green-900 rounded-full p-6">
        <CircleCheckIcon className="w-16 h-16 text-green-500 dark:text-green-400" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Parabéns!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Obrigado pelo seu pedido. Nós agradecemos por ter nos escolhido.
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to="/"
        >
          Continue comprando
        </Link>
      </div>
    </div>
  )
}

function CircleCheckIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
