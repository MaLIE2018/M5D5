import express from 'express';
import cors from 'cors';
import reviewsRoutes from './routes/reviews/reviews.js';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from './routes/errorsHandler.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// app.use('/products', productRoutes, fileRoutes);
app.use('/reviews', reviewsRoutes);

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

app.listen(port, () => console.log(`Server at ${port}`));
