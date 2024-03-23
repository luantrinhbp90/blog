"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    // Handle the request and send a response
    res.json({ message: 'Hello, World!' });
});
app.use('users', routes_1.UserRoute);
(0, swagger_1.setupSwagger)(app); // Set up Swagger UI middleware
mongoose_1.default.connect('mongodb://localhost:27017/startnode1', {})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
const port = 3000; // Or any port you prefer
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
