import express from "express";
import connection from "./database/connection.js";
import shopRouter from "./module/product/product.controller.js";

export const bootstrap = () => {
  const app = express();

  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  });

  app.use(express.json());

  app.use(shopRouter);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};
