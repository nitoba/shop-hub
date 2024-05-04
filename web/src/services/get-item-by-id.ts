import { api } from '@/lib/api'

type GetItemByIdResponse = {
  id: string
  name: string
  priceInCents: number
  type: string
}

type GetItemByIdParams = {
  itemId: string
  type: string
}

export async function getItemById({ itemId, type }: GetItemByIdParams) {
  const response = await api.get<GetItemByIdResponse>(`/items/${itemId}`, {
    params: { type },
  })

  return response.data
}
