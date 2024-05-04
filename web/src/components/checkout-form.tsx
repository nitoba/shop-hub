import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { purchaseItem } from '@/services/purchase-item'
import { toast } from 'sonner'
import { SymbolIcon } from '@radix-ui/react-icons'

const checkoutSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }).min(4),
  documentId: z.string({ required_error: 'Campo obrigatório' }).length(11),
  age: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .int()
    .positive()
    .min(18),
  city: z.string({ required_error: 'Campo obrigatório' }).min(1),
  state: z.string({ required_error: 'Campo obrigatório' }).min(1),
  street: z.string({ required_error: 'Campo obrigatório' }).min(1),
  number: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Preencha somente com números',
    })
    .int()
    .positive(),
  neighborhood: z.string({ required_error: 'Campo obrigatório' }).min(1),
  zipCode: z.string({ required_error: 'Campo obrigatório' }).length(8),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

type Params = { itemId: string; type: string }

export function CheckoutForm() {
  const navigate = useNavigate()
  const { itemId, type } = useParams<Params>()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: purchaseItem,
    onError: (err) => {
      console.error(err)
      toast.error('Erro ao comprar este item, tente novamente')
    },
    onSuccess: (data) => {
      navigate(`/orders/${data.orderId}/success`)
    },
  })

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  function onSubmit({
    name,
    age,
    documentId,
    city,
    neighborhood,
    number,
    state,
    street,
    zipCode,
  }: CheckoutFormData) {
    mutateAsync({
      name,
      age,
      documentId,
      city,
      itemId: itemId!,
      itemType: type!,
      neighborhood,
      number,
      state,
      street,
      zipCode,
    })
  }

  return (
    <Form {...form}>
      <form
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="space-y-6">
          <fieldset>
            <span className="font-bold block mb-3">Informações pessoais</span>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu cpf"
                      {...field}
                      type="tel"
                      maxLength={11}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>idade</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua idade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="space-y-2">
            <span className="font-bold">Endereço</span>
            <div className="flex gap-2 lg:flex-wrap lg:flex-row flex-col">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite sua cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite sua rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o número"
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cep</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu cep"
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="apple-pay">Apple Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 mt-6 lg:flex-row flex-col-reverse">
          <Button
            variant="outline"
            className="flex-1"
            type="button"
            onClick={() => navigate('/')}
            disabled={isPending}
          >
            Cancelar
          </Button>

          <Button className="flex-1" disabled={isPending}>
            Finalizar compra
            {isPending && <SymbolIcon className="animate-spin ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
