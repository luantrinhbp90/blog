import {Response, NextFunction} from 'express';
import {validateToken} from "../utils/token";
import {CustomRequest} from "../interfaces/request";
import {UserRepository} from "../repositories/user.repository";

export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        // Extract the JWT token from the Authorization header
        const token = req.headers.authorization?.split('Bearer ')[1];

        if (token) {
            // Verify and decode the JWT token
            const decodedToken = validateToken(token);

            if (!decodedToken) {
                return res.status(401).json({message: 'Invalid token'});
            }

            // find user

            const userRepo = new UserRepository()

            const user = await userRepo.getObject(decodedToken.id)

            if (!user) {
                res.status(401).json({message: 'Invalid token'});
            }

            // Attach the decoded user data to the request object
            req.user = user;

            // Continue to the next middleware or route handler
            return next();
        }

        return res.status(401).json({message: 'Unauthorized'});
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'});
    }
}
