import Pet from '../models/Pet';

async function seed() {
  await Pet.bulkCreate([
    { ownerId: 1, name: 'Buddy', species: 'Dog', nextWalk: new Date(), nextVet: new Date() },
    { ownerId: 1, name: 'Mittens', species: 'Cat', nextWalk: new Date(), nextVet: new Date() }
  ]);
  console.log('Seeded pets!');
}

seed();
