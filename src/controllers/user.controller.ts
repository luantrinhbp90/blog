import {Get, Route, Tags, Post, Put, Body, Path, Security, Response, Delete} from "tsoa";
import {User} from "../models";
import {
    IUserPayload,
    UserRepository
} from "../repositories/user.repository";

@Route("users")
@Tags("User")
export default class UserController {
    public userRepo = new UserRepository()

    @Get("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getUsers(): Promise<Array<User>> {
        return this.userRepo.getObjects();
    }

    @Get("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getUser(@Path() id: string): Promise<User | null> {
        return this.userRepo.getObject(Number(id));
    }

    @Put("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async editUser(@Path() id: string, @Body() body: IUserPayload): Promise<User> {
        return this.userRepo.editObject(Number(id), body);
    }

    @Delete("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async deleteUser(@Path() id: string): Promise<boolean> {
        return this.userRepo.deleteObject(Number(id));
    }
}