import express from "express";
import multer from "multer";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const { readJSON, writeJSON, writeFile } = fs;

const imagePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img"
);
console.log(imagePath);
export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));
const publicFolderPath = join(
  getCurrentFolderPath(import.meta.url),
  "../public"
);

const writeImage = async (fileName, content) =>
  await writeFile(join(imagePath, fileName), content);

const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../data"
);

const getProducts = async () =>
  await readJSON(join(dataFolderPath, "products.json"));

const writeProducts = async (content) =>
  await writeJSON(join(dataFolderPath, "products.json"), content);

const filesRouter = express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("img"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      //   await writeImage(req.file.originalname, req.file.buffer);
      console.log(imagePath);
      console.log(publicFolderPath);
      const link = `http://localhost:3001/img/${req.file.originalname}`;
      //   res.send(req.file.originalname);

      // console.log(req.body);

      const newProduct = {
        ...req.body,
        img: link,
        createdAt: new Date(),
        // _id: uniqid(),
      };
      console.log(newProduct);

      const Products = await getProducts();
      Products.push(newProduct);
      console.log(Products);

      await writeProducts(Products);
      res.status(201).send(newProduct);
    } catch (error) {
      next(error);
    }
  }
);
export default filesRouter;
