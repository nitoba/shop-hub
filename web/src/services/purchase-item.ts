import { api } from '@/lib/api'

type PurchaseItemBody = {
  itemId: string
  itemType: string
  number: number
  name: string
  documentId: string
  age: number
  city: string
  state: string
  street: string
  neighborhood: string
  zipCode: string
}

type RegisterUserResponse = {
  userId: string
}

type PurchaseItemResponse = {
  orderId: string
}

export async function purchaseItem({
  itemId,
  itemType,
  city,
  documentId,
  age,
  name,
  neighborhood,
  number,
  state,
  street,
  zipCode,
}: PurchaseItemBody) {
  const { data: registerUserResponse } = await api.post<RegisterUserResponse>(
    '/auth/register',
    {
      name,
      documentId,
      age,
      address: { city, state, number, neighborhood, street, zipCode },
    },
  )

  const purchaseResponse = await api.post<PurchaseItemResponse>(
    `/items/${itemId}/purchase`,
    {
      itemType,
    },
    {
      headers: {
        xuserid: registerUserResponse.userId,
      },
    },
  )

  return purchaseResponse.data
}
