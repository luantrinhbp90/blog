import express from "express";
import PostController from "../controllers/post.controller";
import {authMiddleware} from "../middelwares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, async (_req, res) => {
    const controller = new PostController();
    const response = await controller.getPosts();
    return res.send(response);
});

router.post("/", authMiddleware, async (req, res) => {
    const controller = new PostController();
    const response = await controller.createPost(req.body);
    return res.send(response);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const controller = new PostController();
    const response = await controller.getPost(req.params.id);
    if (!response) res.status(404).send({message: "No post found"});
    return res.send(response);
});

router.put("/:id", authMiddleware, async (req, res) => {
    const controller = new PostController();
    const response = await controller.editPost(req.params.id, req.body);
    if (!response) res.status(404).send({message: "No post found"});
    return res.send(response);
})

router.delete("/:id", authMiddleware, async (req, res) => {
    const controller = new PostController();
    const response = await controller.deletePost(req.params.id);
    if (!response) res.status(404).send({message: "No post found"});
    return res.send(response);
})

export default router;