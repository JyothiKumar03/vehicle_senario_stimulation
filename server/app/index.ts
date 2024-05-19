import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import scenarioRoutes from './routes/senarioRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });


const app: Application = express();
const port = process.env.PORT;


app.use(bodyParser.json());

const API_URL = process.env.API_URL; 

// CORS options
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "*",
  preflightContinue: false,
};

// Use CORS middleware
app.use(cors(options));

app.use('/scenarios', scenarioRoutes);
app.use('/vehicles', vehicleRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
