import {getRepository} from "typeorm";
import {Post} from "../models";
import {BaseRepositoryInterface} from "./base.repository";

export interface IPostPayload {
    title: string;
    content: string;
    userId: number;
}

export class PostRepository implements BaseRepositoryInterface {
    private repo = getRepository(Post);

    public async getObjects(): Promise<Array<Post>> {
        return this.repo.find();
    };

    public async createObject(payload: IPostPayload): Promise<Post> {
        const obj = new Post();
        return this.repo.save({
            ...obj,
            ...payload,
        });
    };

    public async getObject(id: number): Promise<Post | null> {
        const obj = await this.repo.findOne({where: {id}});
        if (!obj) return null;
        return obj;
    };

    public async editObject(id: number, payload: IPostPayload): Promise<Post | null> {
        const obj = await this.repo.findOne({where: {id}});
        if (!obj) return null;
        return this.repo.save({id: id, ...payload})
    }

    public async deleteObject(id: number): Promise<boolean> {
        const obj = await this.repo.findOne({where: {id}});
        if (!obj) return false
        await this.repo.delete(obj)
        return true
    }
}