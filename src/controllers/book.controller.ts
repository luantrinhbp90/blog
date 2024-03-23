import {Book} from "../models";
import {Body, Get, Route, Tags, Post, Put, Delete, Path, Security, Response} from "tsoa";
import {BookRepository, IBookPayload} from "../repositories/book.repository";


@Route("books")
@Tags("Book")
export class BookController {
    private bookRepo = new BookRepository()

    @Get("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getBooks(): Promise<Array<Book>> {
        return await this.bookRepo.getObjects()
    }

    @Get("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getBook(@Path() id: string): Promise<Book | null> {
        return this.bookRepo.getObject(Number(id))
    }

    @Post("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async createBook(@Body() body: IBookPayload): Promise<Book> {
        return this.bookRepo.createObject(body);
    }

    @Put("/:id")
    // @Security('bearerAuth')
    // @Response('401', 'Unauthorized')
    public async editBook(@Path() id: string, @Body() body: IBookPayload): Promise<Book | null> {
        return this.bookRepo.editObject(Number(id), body)
    }

    @Delete("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async deleteBook(@Path() id: string): Promise<any> {
        return await this.bookRepo.deleteObject(Number(id))
    }


}