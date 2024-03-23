import express from "express";
import {AuthController, IResponse} from "../controllers/auth.controller";

const router = express.Router();

router.post("/token/", async (req, res) => {
    const authController = new AuthController();
    const data: IResponse = await authController.login(req.body)
    return res.status(data.statusCode).send(data.content)
});

router.post("/register/", async (req, res) => {
    const controller = new AuthController();
    const validate: boolean = await controller.userRepo.validationUserExist(0, req.body)
    if (validate) {
        return res.status(400).send({message: "Email already exist!"})
    }
    const response = await controller.registerUser(req.body);
    return res.send(response);
});


export default router;

