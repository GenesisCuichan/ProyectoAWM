import express from "express"; //Librería express
import path from "path"; //Librería path para archivos
import mongoose from "mongoose"; //Librería mongoDB
import dotenv from "dotenv"; //Librería para realizar archivos de configuración
import seedRouter from "./routes/seedRoutes.js"; //Librería dentro del componente Routes - SeedRoutes
import productRouter from "./routes/productRoutes.js"; //Librería dentro del componente Routes - ProductRoutes
import userRouter from "./routes/userRoutes.js"; //Librería dentro del componente Routes - UserRoutes
import orderRouter from "./routes/orderRoutes.js"; //Librería dentro del componente Routes - OrderRoutes
import uploadRouter from "./routes/uploadRoutes.js"; //Librería dentro del componente Routes - UploadRoutes

//Habilita la configuración de archivos
dotenv.config();

//Llamado a la BDD
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err.message);
  });

//Llamado a la librería Express
const app = express();

//Carga del archivo JSON por medio de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Petición de la API por medio de Google
app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

//Carga de las APIs de los Componentes
app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

//Llamada de cada función por medio de la ubicación del archivo
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

//Respuesta a la petición enviada en caso de que no llegue la petición
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//Uso del puerto 5000 para el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor en: http://localhost:${port}`);
});
