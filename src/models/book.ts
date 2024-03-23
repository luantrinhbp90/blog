import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import {User} from "./user";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    name!: string;

    @Column({
        type: "text",
    })
    content!: string;

    @Column({nullable: true})
    authorId!: number;
    @ManyToOne((_type) => User, (user: User) => user.books)
    @JoinColumn()
    author!: User;

    @CreateDateColumn()
    publisher!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}