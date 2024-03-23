import {Router, Response} from "express"
import {CustomRequest} from "../interfaces/request";
import {BookController} from "../controllers/book.controller";
import {authMiddleware} from "../middelwares/auth.middleware";

const router = Router()

router.get("/", async (req: CustomRequest, res: Response) => {
    const bookCtr = new BookController()
    const books = await bookCtr.getBooks()
    return res.status(200).send(books)
})

router.get("/:id", async (req: CustomRequest, res: Response) => {
    const bookCtr = new BookController()
    const book = await bookCtr.getBook(req.params.id)
    if (!book) {
        return res.status(400).send({"message": "Not found object"})
    }
    return res.status(200).send(book)
})


router.post("/", async (req: CustomRequest, res: Response) => {
    const bookCtr = new BookController()
    const book = await bookCtr.createBook(req.body)
    return res.status(200).send(book)
})

router.put("/:id", async (req: CustomRequest, res: Response) => {
    const bookCtr = new BookController()
    const books = await bookCtr.editBook(req.params.id, req.body)
    return res.status(200).send(books)
})

router.delete("/:id", async (req: CustomRequest, res: Response) => {
    const bookCtr = new BookController()
    const status: boolean = await bookCtr.deleteBook(req.params.id)
    if (!status) {
        return res.status(400).send({"message": "Not found the object"})
    }
    return res.status(200)
})

export default router