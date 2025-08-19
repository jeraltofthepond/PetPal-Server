import Pet from '../models/Pet';

// Get all pets by owner
export const getPets = async (ownerId: number) => {
  return Pet.findAll({ where: { ownerId } });
};

// Create a new pet
export const createPet = async (data: any, filePath?: string) => {
  return Pet.create({
    ...data,
    photo: filePath || null
  });
};

// Update existing pet
export const updatePet = async (id: number, data: any, filePath?: string) => {
  const pet = await Pet.findByPk(id);
  if (!pet) throw new Error('Pet not found');

  return pet.update({
    ...data,
    photo: filePath || pet.get('photo')
  });
};
