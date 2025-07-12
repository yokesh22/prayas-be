import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registrationRoutes from './routes/register.js';
import validateQRRoutes from './routes/qrcodeValidate.js';
import loginRoutes from './routes/login.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api', registrationRoutes);
app.use('/api', validateQRRoutes);
app.use('/api', loginRoutes)

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
