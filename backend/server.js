import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products/products.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.listen(port, () => console.log(`Server at ${port}`));
