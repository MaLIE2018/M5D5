import express from 'express';
import uniqid from 'uniqid';
import { readProducts, writeProducts } from '../../lib/fs-tools.js';
import createError from 'http-errors';
import { productValidation } from './validation.js';

/*
****************** products CRUD ********************
1. CREATE → POST http://localhost:3001/products (+ body)
2. READ → GET http://localhost:3001/products (+ optional query parameters)
3. READ → GET http://localhost:3001/products/:id
4. UPDATE → PUT http://localhost:3001/products/:id (+ body)
5. DELETE → DELETE http://localhost:3001/products/:id
*/

const productsRouter = express.Router();

// ****************** ROUTES ******************** //

// create/POST product
productsRouter.post('/', async (req, res, next) => {
  try {
    // 1. read request body
    const content = await readProducts();

    const newProduct = {
      _id: uniqid(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // console.log(content, 'djhgdf');

    content.push(newProduct);

    await writeProducts(content);

    res.send(newProduct);
  } catch (error) {
    // res.status(500).send({ message: error.message });
    next(error);
  }
});

// GET all products
productsRouter.get('/', async (req, res, next) => {
  try {
    // 1. read request body
    const content = await readProducts();

    // 2. send the content as a response
    res.send(content);
  } catch (error) {
    // res.send({ message: error.message });
    next(error);
  }
});

// GET single product
productsRouter.get('/:id', async (req, res, next) => {
  try {
    // 1. read request body
    const content = await readProducts();

    // 2. filter products for id and send back content as response
    const product = content.filter((product) => product._id === req.params.id);

    if (product.length > 0) {
      res.send(product);
    } else {
      res
        .status(404)
        .send({ message: `blog with ${req.params.id} id not found!` });
    }
  } catch (error) {
    next(error);
  }
});

// PUT/update product
productsRouter.put('/:id', async (req, res, next) => {
  try {
    const content = await readProducts();
    console.log(content);
    if (content.find((product) => product._id === req.params.id)) {
      const product = content.findIndex(
        (product) => product._id === req.params.id
      );
      // don't forget carry on previous values
      const previousProduct = content[product];

      const newProduct = {
        ...previousProduct,
        ...req.body,
        // createdAt: new Date(),
        updatedAt: new Date(),
      };

      content[product] = newProduct;

      await writeProducts(content);

      res.send(newProduct);
    } else {
      res
        .status(404)
        .send({ message: `product with ${req.params.id} id not found!` });
    }
  } catch (error) {
    // res.send(500).send({ message: error.message });
    next(error);
  }
});

// DELETE product
productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const content = await readProducts();

    if (content.find((product) => product._id === req.params.id)) {
      const newProduct = content.filter(
        (content) => content._id !== req.params.id
      );
      await writeProducts(newProduct);
      res.send('Product has been DELETED');
    } else {
      res
        .status(404)
        .send({ message: `product with ${req.params.id} id not found!` });
    }
  } catch (error) {
    // res.send(500).send({ message: error.message });
    next(error);
  }
});
export default productsRouter;
