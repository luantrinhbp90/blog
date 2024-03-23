import {getRepository, Not} from "typeorm";
import {User} from "../models";
import bcrypt from "bcrypt";
import {BaseRepositoryInterface} from "./base.repository";

export interface IUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export interface IPayloadLogin {
    email: string;
    password: string;
}

export class UserRepository implements BaseRepositoryInterface {
    private repo = getRepository(User);

    private static async hashPassword(payload: IUserPayload): Promise<IUserPayload> {
        payload.password = await bcrypt.hash(payload.password, 10)
        return payload
    }

    public async validationUserExist(id: number, payload: IUserPayload): Promise<boolean> {
        return await this.repo.exist({where: {id: Not(id), email: payload.email}})
    }


    public async getObjects(): Promise<Array<User>> {
        return this.repo.find();
    };

    public async createObject(payload: IUserPayload): Promise<User> {
        payload = await UserRepository.hashPassword(payload)
        const user = new User();
        return await this.repo.save({
            ...user,
            ...payload,
        });
    };

    public async getObject(id: number): Promise<User | null> {
        const user = await this.repo.findOne({where: {id}});
        if (!user) return null;
        return user;
    };


    public async editObject(id: number, payload: IUserPayload): Promise<User> {
        payload = await UserRepository.hashPassword(payload)
        return await this.repo.save({id: id, ...payload})
    }

    public async deleteObject(id: number): Promise<boolean> {
        const user = await this.repo.findOne({where: {id}});
        if (!user) return false
        await this.repo.delete(user)
        return true
    }
}