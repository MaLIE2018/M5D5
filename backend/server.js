import express from 'express';
import cors from 'cors';
import reviewsRoutes from './routes/reviews/reviews.js';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from './routes/errorsHandler.js';
import filesRouter from './modules/files/fileHandler.js';
import { getCurrentFolderPath } from './modules/files/fileHandler.js';
import { dirname, join } from 'path';
import productRoutes from './routes/products/products.js';

const app = express();
const port = 3001;

const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  '../public'
);

app.use(express.static(publicFolderPath));
app.use(cors());
app.use(express.json());

app.use('/reviews', reviewsRoutes);
app.use('/products', filesRouter);

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

app.listen(port, () => console.log(`Server at ${port}`));
app.on('error', (error) => console.log(`Server is not running: ${error}`));
