export class ItemNotFoundError extends Error {
  constructor(itemId: string) {
    super(`Item with id ${itemId} not found`)
  }
}
