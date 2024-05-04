import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ItemType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error', 'query'],
})
export async function seed() {
  const internetServiceId = new UniqueEntityID().toString()
  const items = [
    {
      id: internetServiceId.toString(),
      name: 'Internet 1GB',
      priceInCents: 74100,
      type: 'INTERNET_SERVICE',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Email 500mb',
      priceInCents: 4900,
      type: 'OFF_SERVICE',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Livro digital',
      priceInCents: 20900,
      type: 'OFF_SERVICE',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Mouse',
      priceInCents: 9_900,
      type: 'PRODUCT',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Teclado',
      priceInCents: 25_900,
      type: 'PRODUCT',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Roteador',
      priceInCents: 79_900,
      type: 'PRODUCT',
    },
    {
      id: new UniqueEntityID().toString(),
      name: 'Combo',
      priceInCents: 99_900,
      type: 'PACKAGE',
    },
  ]

  for await (const item of items) {
    await prisma.item.create({
      data: {
        id: item.id,
        name: item.name,
        priceInCents: item.priceInCents,
        type: item.type as ItemType,
      },
    })
  }

  const coverage = await prisma.coverage.create({
    data: {
      zipCode: '12345678',
    },
  })

  await prisma.itemsOnCoverage.create({
    data: {
      itemId: internetServiceId,
      coverageId: coverage.id,
    },
  })
}

seed()
  .then(() => console.log('Seed completed!'))
  .catch(() => console.log('Error while seeding'))
  .finally(() => prisma.$disconnect())
