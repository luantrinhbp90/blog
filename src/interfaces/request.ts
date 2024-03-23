import {Request} from "express"
import {User} from "../models";

export interface CustomRequest extends Request {
    user?: User | null
}