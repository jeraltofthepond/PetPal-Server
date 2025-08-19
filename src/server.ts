import express from 'express';
import cors from 'cors';
import { sequelize } from './db';
import petsRouter from './routes/PetRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/pets', petsRouter);

sequelize.sync().then(() => {
  app.listen(4000, () => console.log('Server running on http://localhost:4000'));
});
