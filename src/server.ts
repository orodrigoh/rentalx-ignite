import "reflect-metadata";
import express from "express";
import categoriesRoutes from "./routes/categories.routes";
import specificationsRoutes from "./routes/specifications.routes";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () =>
  console.log("server is running on http://localhost:3333 🔥")
);
