import {getRepository} from "typeorm";
import {Comment} from "../models";
import {BaseRepositoryInterface} from "./base.repository";

export interface ICommentPayload {
    content: string;
    userId: number;
    postId: number;
}

export class CommentRepository implements BaseRepositoryInterface {
    private repo = getRepository(Comment);

    public async getObjects(): Promise<Array<Comment>> {
        return this.repo.find();
    };

    public async createObject(payload: ICommentPayload): Promise<Comment> {
        const obj = new Comment();
        return this.repo.save({
            ...obj,
            ...payload,
        });
    };

    public async getObject(id: number): Promise<Comment | null> {
        const obj = await this.repo.findOne({where: {id}});
        if (!obj) return null;
        return obj;
    };

    public async editObject(id: number, payload: ICommentPayload): Promise<Comment | null> {
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