import express from 'express';
import * as PetController from '../controllers/PetController';
import upload from '../middleware/multerConfig';

const router = express.Router();

// Route to add a new pet (with photo upload)
router.post('/pets', upload.single('photo'), PetController.addPet); // 'photo' is the field name in the form

// Route to update pet profile (with photo upload)
router.put('/pets/:id', upload.single('photo'), PetController.updatePet);

//get all pets
router.get('/pets', PetController.getPets);

// get a specific pet by ID
router.get('/pets/:id', PetController.getPetById);

export default router;
