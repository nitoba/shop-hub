import { fetchItems } from '@/services/fetch-items'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useFetchItems() {
  const [zipCode, setZipCode] = useState('')
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['items', zipCode],
    queryFn: ({ queryKey }) => fetchItems({ zipCode: queryKey[1] }),
    enabled: false,
  })

  async function handleSearchItems(zipCode: string) {
    setZipCode(zipCode)
  }

  useEffect(() => {
    if (zipCode.length > 0) {
      refetch()
    }
  }, [zipCode, refetch])

  return { items, isLoading, handleSearchItems }
}
