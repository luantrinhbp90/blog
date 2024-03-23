import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    UpdateDateColumn
} from "typeorm";
import {IsEmail, IsNotEmpty} from 'class-validator';
import {Post} from "./post";
import {Comment} from "./comment";
import {Book} from "./book";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Column()
    password!: string;

    @OneToMany((_type) => Post, (post: Post) => post.user)
    posts!: Array<Post>;

    @OneToMany((_type) => Comment, (comment: Comment) => comment.user)
    comments!: Array<Comment>;

    @OneToMany((_type) => Book, (book: Book) => book.author)
    books!: Array<Book>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
