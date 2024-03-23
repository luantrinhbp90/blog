import {Get, Route, Tags, Post, Body, Path, Security, Response, Put, Delete} from "tsoa";
import {Post as PostModel} from "../models";
import {
    IPostPayload,
    PostRepository,
} from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
    public postRepo = new PostRepository()

    @Get("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getPosts(): Promise<Array<PostModel>> {
        return this.postRepo.getObjects();
    }

    @Get("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async getPost(@Path() id: string): Promise<PostModel | null> {
        return this.postRepo.getObject(Number(id));
    }

    @Post("/")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async createPost(@Body() body: IPostPayload): Promise<PostModel> {
        return this.postRepo.createObject(body);
    }

    @Put("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async editPost(@Path() id: string, @Body() body: IPostPayload): Promise<PostModel | null> {
        return this.postRepo.editObject(Number(id), body);
    }

    @Delete("/:id")
    @Security('bearerAuth')
    @Response('401', 'Unauthorized')
    public async deletePost(@Path() id: string): Promise<boolean> {
        return this.postRepo.deleteObject(Number(id));
    }
}