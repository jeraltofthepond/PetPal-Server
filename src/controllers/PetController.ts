import Pet from '../models/Pet';
import { Request, Response } from 'express';

// Date coercion
const toDate = (dateString: string | undefined): Date | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
};

// Add a new pet
export const addPet = async (req: Request, res: Response) => {
  try {
    const { ownerId, nickname, species, nextFeed, nextVet } = req.body;

    // Coerce into Date objects
    const coercedNextFeed = toDate(nextFeed);
    const coercedNextVet = toDate(nextVet);

    const photo = req.file ? req.file.path : null;

    //creation
    const newPet = await Pet.create({
      ownerId,
      nickname,
      species,
      nextFeed: coercedNextFeed,
      nextVet: coercedNextVet,
      photo
    });

    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    res.status(500).json({ message: 'Error adding pet' });
  }
};

// Update existing pet
export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ownerId, nickname, species, nextFeed, nextVet } = req.body;

  try {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const coercedNextFeed = nextFeed ? toDate(nextFeed) : pet.nextFeed;
    const coercedNextVet = nextVet ? toDate(nextVet) : pet.nextVet;

    // If a new file was uploaded, update the photo path
    const photo = req.file ? req.file.path : pet.photo;

    // Update bit
    pet.ownerId = ownerId || pet.ownerId;
    pet.nickname = nickname || pet.nickname;
    pet.species = species || pet.species;
    pet.nextFeed = coercedNextFeed;
    pet.nextVet = coercedNextVet;
    pet.photo = photo;
    await pet.save();
    res.status(200).json({ message: 'Pet updated successfully', pet });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet' });
  }
};

// Get all pets by owner
export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json({ pets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets' });
  }
};

// Get pets by id
export const getPetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ pet });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet' });
  }
};
