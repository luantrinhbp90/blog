import express, {Response} from "express";
import UserController from "../controllers/user.controller";
import {authMiddleware} from "../middelwares/auth.middleware";
import {CustomRequest} from "../interfaces/request";

const router = express.Router();

router.get("/", authMiddleware, async (_req: CustomRequest, res: Response) => {
    const controller = new UserController();
    const response = await controller.getUsers();
    return res.send(response);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUser(req.params.id);
    if (!response) return res.status(404).send({message: "No user found"});
    return res.send(response);
});

router.put("/:id", authMiddleware, async (req, res) => {
    const controller = new UserController();
    const validate: boolean = await controller.userRepo.validationUserExist(Number(req.params.id), req.body)
    if (validate) {
        return res.status(400).send({message: "Email already exist!"})
    }
    const response = await controller.editUser(req.params.id, req.body)
    if (!response) res.status(404).send({message: "No user found"});
    return res.send(response);
})

export default router;