import { Controller, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './ui/input-otp'

const searchSchema = z.object({
  zipCode: z
    .string({ required_error: 'cep é obrigatório' })
    .length(8, 'cep deve ter 8 dígitos'),
})

type SearchFormData = z.infer<typeof searchSchema>

type Props = {
  onSubmitSearch: (zipCode: string) => void
}

export function SearchForm({ onSubmitSearch }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  function handleSearchItems(data: SearchFormData) {
    onSubmitSearch(data.zipCode)
    reset({ zipCode: '' })
  }

  return (
    <div className="mt-8 gap-3 flex justify-center">
      <form
        className="grid w-full max-w-sm text-center gap-1.5 justify-center"
        onSubmit={handleSubmit(handleSearchItems)}
      >
        <Label className="text-sm">
          Use seu cep para buscar serviços disponíveis na sua região
        </Label>
        <Controller
          control={control}
          name="zipCode"
          render={({ field: { value, name, onChange, onBlur } }) => (
            <InputOTP
              maxLength={8}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-auto" />
              <InputOTPGroup>
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.zipCode?.message && (
          <small className="text-sm text-destructive">
            {errors.zipCode.message}
          </small>
        )}
        <Button size={'lg'} type="submit">
          Buscar
        </Button>
      </form>
    </div>
  )
}
