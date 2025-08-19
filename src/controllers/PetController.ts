import Pet from '../models/Pet';

//Date coercion
const toDateOrNull = (x: any) => (x ? new Date(x) : null);

// Get all pets by owner
export const getPets = async (ownerId: number) => {
  return Pet.findAll({ where: { ownerId } });
};

// Get pets by id
export const getPetById = async (id: number) => {
  const pet = await Pet.findByPk(id);
  if (!pet) throw new Error('Pet not found!');
  return pet;
};

// Create a new pet
export const createPet = async (raw: any, filePath?: string) => {
  const data = {
    ownerId: Number(raw.ownerId),
    name: String(raw.name).trim(),
    species: String(raw.species).trim(),
    nextFeed: toDateOrNull(raw.nextFeed),
    nextVet: toDateOrNull(raw.nextVet),
    photo: filePath || null
  };
  if (!data.ownerId || data.name || data.species) throw new Error('Owner ID, Name and Species are required!');
  return Pet.create(data);
};

// Update existing pet
export const updatePet = async (id: number, raw: any, filePath?: string) => {
  const pet = await Pet.findByPk(id);
  if (!pet) throw new Error('Pet not found');

  //   return pet.update({
  //     ...data,
  //     photo: filePath || pet.get('photo')
  //   });

  const updates: any = {};
  if (raw.ownerId !== undefined) updates.ownerId = Number(raw.ownerId);
  if (raw.name !== undefined) updates.name = String(raw.name).trim();
  if (raw.species !== undefined) updates.species = String(raw.species).trim();
  if (raw.nextWalk !== undefined) updates.nextWalk = toDateOrNull(raw.nextWalk);
  if (raw.nextVet !== undefined) updates.nextVet = toDateOrNull(raw.nextVet);
  if (filePath) updates.photo = filePath;

  return pet.update(updates);
};
