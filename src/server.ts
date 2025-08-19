import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './db';
import petsRouter from './routes/PetRoutes';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json('API Working!');
});

//serve upload images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/pets', petsRouter);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log('Server running on http://localhost:4000'));
});
