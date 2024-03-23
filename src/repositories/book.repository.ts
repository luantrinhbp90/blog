import {getRepository} from "typeorm";
import {Book} from "../models";
import {BaseRepositoryInterface} from "./base.repository";

export interface IBookPayload {
    name: string,
    authorId: number,
    content: string,
    publisher: Date
}

export class BookRepository implements BaseRepositoryInterface {
    private repo = getRepository(Book);

    public async getObjects(): Promise<Array<Book>> {
        return this.repo.find();
    };

    public async createObject(payload: IBookPayload): Promise<Book> {
        const obj = new Book();
        return this.repo.save({
            ...obj,
            ...payload,
        });
    };

    public async getObject(id: number): Promise<Book | null> {
        const obj = await this.repo.findOne({where: {id}});
        if (!obj) return null;
        return obj;
    };

    public async editObject(id: number, payload: IBookPayload): Promise<Book | null> {
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