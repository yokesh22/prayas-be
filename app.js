import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registrationRoutes from './routes/register.js';

dotenv.config();

const app = express();

// Allow all origins (development)
app.use(cors());

// Or restrict to a specific origin:
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(express.json());

app.use('/api', registrationRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
