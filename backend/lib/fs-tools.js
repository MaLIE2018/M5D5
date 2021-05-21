import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data');
console.log(dataFolderPath, '*fs-tools ==> dataFolderPath*');

// read products function
export const readProducts = async () =>
  await readJSON(join(dataFolderPath, 'products.json'));
// console.log(readProducts, 'fsjdfjk');

// write products function
export const writeProducts = async (data) =>
  await writeJSON(join(dataFolderPath, 'products.json'), data);
