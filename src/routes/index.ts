import express from "express";
import PingController from "../controllers/ping.controller";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import CommentRouter from "./comment.router";
import AuthRouter from "./auth.router";
import BookRouter from "./book.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.use("/users", UserRouter);
router.use("/posts", PostRouter);
router.use("/comments", CommentRouter);
router.use("/auth", AuthRouter);
router.use("/books", BookRouter);

export default router;