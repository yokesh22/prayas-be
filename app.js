import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registrationRoutes from './routes/register.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://prayaas-ui.i4ulabs.com',
];

app.use(cors());
app.use(express.json());

app.use('/api', registrationRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
