import dotenv from "dotenv";

import express from "express"

import { moviesRouter } from "./app/routers/movies";
import { partiesRouter } from "./app/routers/parties";

import loggerMiddleware from "./app/middlewares/logger";
import errorMiddleware from "./app/middlewares/error";

import { connect } from "./core/database/connect";

dotenv.config();

connect();

const app = express();

app.use(errorMiddleware);
app.use(loggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = express.Router();

app.use("/api", api);
api.use("/movies", moviesRouter);
api.use("/parties", partiesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});