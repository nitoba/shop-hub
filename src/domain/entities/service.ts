import { Item, ItemProps } from './item'

export type ServiceProps = ItemProps

export abstract class Service<Props = ServiceProps> extends Item<Props> {}
