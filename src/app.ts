import {createConnection} from "typeorm";
import express, {Application} from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Routes from "./routes";
import dbConfig from "./configs/database";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3200;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    })
);

app.use(Routes);

createConnection(dbConfig)
    .then((_connection) => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to db", err);
        process.exit(1);
    });