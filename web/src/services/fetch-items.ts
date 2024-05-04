import { api } from '@/lib/api'

export interface Item {
  id: string
  name: string
  priceInCents: number
}

export interface Services {
  internet: Item[]
  off_one: Item[]
  packages: Item[]
}

export interface FetchItemsResponse {
  services: Services
  products: Item[]
}

type Params = { zipCode: string }

export async function fetchItems(params: Params) {
  const response = await api.get<FetchItemsResponse>('/items', {
    params,
  })

  return response.data
}
