import { Entity } from '@/core/entities/entity'

export type ItemProps = {
  name: string
  priceInCents: number
}

export abstract class Item<Props = ItemProps> extends Entity<
  Props & ItemProps
> {}
