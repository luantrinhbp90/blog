import jwt from "jwt-simple"
import {User} from "../models";


const secretKey = process.env.SECRET_KEY || "startnode1"


export function generateToken(user: User) {
    const payload = {
        id: user.id,
        email: user.email,
        // Add any additional user data as needed
    };

    return jwt.encode(payload, secretKey);
}


export function validateToken(token: string) {
    try {
        return jwt.decode(token, secretKey);
    } catch (error) {
        return null;
    }
}