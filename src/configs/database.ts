import {ConnectionOptions} from "typeorm";
import {User, Post, Comment,  Book} from '../models'

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "host.docker.internal",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "startnode1",
    entities: [User, Post, Comment, Book],
    synchronize: true,
};

export default config;