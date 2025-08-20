import Pet from '../models/Pet';

async function seed() {
  await Pet.bulkCreate([
    { ownerId: 1, nickname: 'Buddy', species: 'Dog', nextFeed: new Date(), nextVet: new Date() },
    { ownerId: 1, nickname: 'Mittens', species: 'Cat', nextFeed: new Date(), nextVet: new Date() }
  ]);
  console.log('Seeded pets!');
}

seed();
