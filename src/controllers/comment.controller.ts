import {Get, Route, Tags, Post, Body, Path, Security, Response, Put, Delete} from "tsoa";
import {Comment} from "../models";
import {
    ICommentPayload,
    CommentRepository,
} from "../repositories/comment.repository";

@Route("comments")
@Tags("Comment")
export default class CommentController {
    private commentRepo = new CommentRepository();

    @Get("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getComments(): Promise<Array<Comment>> {
        return this.commentRepo.getObjects();
    }

    @Post("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
        return this.commentRepo.createObject(body);
    }

    @Get("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getComment(@Path() id: string): Promise<Comment | null> {
        return this.commentRepo.getObject(Number(id));
    }

    @Put("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async putComment(@Path() id: string, @Body() body: ICommentPayload): Promise<Comment | null> {
        return this.commentRepo.getObject(Number(id));
    }

    @Delete("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async deleteComment(@Path() id: string): Promise<boolean> {
        return this.commentRepo.deleteObject(Number(id));
    }
}