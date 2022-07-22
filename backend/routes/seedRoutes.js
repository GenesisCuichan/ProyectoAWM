import express from 'express'; //Librería para Express
import Product from '../models/productModel.js'; //Librería del componente Models - ProductModel
import data from '../data.js'; //Librería de la Data
import User from '../models/userModel.js'; //Librería del componente Models - UserModels

//Llamada de Express
const seedRouter = express.Router();

//Petición Seed
seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
