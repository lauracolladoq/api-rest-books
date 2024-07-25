import express from 'express'; //Permite crear el servidor
import fs from 'fs'; //Permite trabajar con archivos

const app = express();

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

// Creación de endpoint
app.get('/', (req, res) => {
    res.send("Welcome to my API!");
});

// Endpoint para obtener todos los libros
app.get('/books', (req, res) => {
    const data = readData();
    // Obtener solo los libros
    res.send(data.books);
});

// Endpoint para obtener un libro por su id
app.get('/books/:id', (req, res) => {
    const data = readData();
    const book = data.books.find(book => book.id === req.params.id);
    res.send(book);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});

