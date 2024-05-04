/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ODPGcvcnN8Z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CheckoutForm } from '@/components/checkout-form'
import { SummaryOrder } from '@/components/summary-order'

export function OrderPage() {
  return (
    <div className="container py-12 px-4 md:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh_-_10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <SummaryOrder />
        <CheckoutForm />
      </div>
    </div>
  )
}
