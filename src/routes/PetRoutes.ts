import express from 'express';
import multer from 'multer';
import { getPets, createPet, updatePet } from '../controllers/PetController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GET /api/pets?ownerId=1
router.get('/', async (req, res) => {
  try {
    const ownerId = Number(req.query.ownerId);
    if (!ownerId) return res.status(400).json({ error: 'ownerId required' });

    const pets = await getPets(ownerId);
    res.json(pets);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/pets
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const pet = await createPet(req.body, req.file?.path);
    res.json(pet);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/pets/:id
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const pet = await updatePet(Number(req.params.id), req.body, req.file?.path);
    res.json(pet);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
