import express from "express"; 
import fs from "fs"; //Permite trabajar con archivos
import bodyParser from "body-parser"; //Permite trabajar con el cuerpo de las peticiones

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node js!");
});

// ------------------------------------------- BOOKS -------------------------------------------
// Endpoint para obtener todos los libros
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);
});

// Endpoint para obtener un libro por su id
app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});

// Endpoint para crear un libro
app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

// Endpoint para actualizar un libro
app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});

// Endpoint para eliminar un libro
app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });
});

// ------------------------------------------- MAGAZINES -------------------------------------------
// Endpoint para obtener todos las revistas
app.get("/magazines", (req, res) => {
    const data = readData();
    res.json(data.magazines);
});

// Endpoint para obtener una revista por su id
app.get("/magazines/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const magazine = data.magazines.find((magazine) => magazine.id === id);
    res.json(magazine);
});

// Endpoint para crear una revista
app.post("/magazines", (req, res) => {
    const data = readData();
    const body = req.body;
    const newmagazine = {
        id: data.magazines.length + 1,
        ...body,
    };
    data.magazines.push(newmagazine);
    writeData(data);
    res.json(newmagazine);
});

// Endpoint para actualizar una revista
app.put("/magazines/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const magazineIndex = data.magazines.findIndex((magazine) => magazine.id === id);
    data.magazines[magazineIndex] = {
        ...data.magazines[magazineIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Magazine updated successfully" });
});

// Endpoint para eliminar una revista
app.delete("/magazines/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const magazineIndex = data.magazines.findIndex((magazine) => magazine.id === id);
    data.magazines.splice(magazineIndex, 1);
    writeData(data);
    res.json({ message: "Magazine deleted successfully" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});