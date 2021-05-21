import express from 'express';
import cors from 'cors';
import filesRouter from './modules/files/fileHandler.js';
import { getCurrentFolderPath } from './modules/files/fileHandler.js';
import { dirname, join } from 'path';
import productRoutes from './routes/products/products.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  '../public'
);

console.log(publicFolderPath);
app.use(express.static(publicFolderPath));

app.use(cors());
app.use(express.json());

app.use('/products', filesRouter);

app.listen(port, () => console.log(`Server at ${port}`));
