import bcrypt from "bcrypt";
import {getRepository} from "typeorm";
import {User} from "../models";
import {Body, Post, Route, Tags} from "tsoa";
import {IPayloadLogin, IUserPayload, UserRepository} from "../repositories/user.repository";

import {generateToken} from "../utils/token"

// Define a secret key for signing and verifying JWTs
const secretKey = process.env.SCRET_KEY || "startnode1";

export interface IResponse {
    statusCode: number;
    content: any
}

@Route("auth")
@Tags("Authorization")
export class AuthController {
    public userRepo = new UserRepository()

    @Post("/token")
    public async login(@Body() body: IPayloadLogin): Promise<IResponse> {
        const {email, password} = body;

        try {
            // Check if the user exists in the database
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({where: {email: email}});

            if (!user) {
                return {
                    statusCode: 401,
                    content: {message: "Invalid credentials"}
                };
            }

            // Check if the password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    statusCode: 401,
                    content: {message: "Invalid password"}
                };
            }

            // Generate a JWT token with user data
            const token = await generateToken(user)

            // Send the token in the response
            return {
                statusCode: 200,
                content: {token}
            };
        } catch (error) {
            console.error("Login error:", error);
            return {
                statusCode: 500,
                content: {message: "Internal server error"}
            };
        }
    }

    @Post("/register")
    // @Security('bearerAuth')
    // @Response('401', 'Unauthorized')
    public async registerUser(@Body() body: IUserPayload): Promise<User> {
        return this.userRepo.createObject(body);
    }
}
