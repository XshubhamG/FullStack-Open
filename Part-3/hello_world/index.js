import express from "express";
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content: "Node.js is an event loop",
    important: true,
  },
];

//? root endpoint
app.get("/", (_, res) => {
  res.send("<h1>Hello World!</h1>");
});

//? fetching all notes
app.get("/api/notes", (_, res) => {
  res.json(notes);
});

//? fetching a single note
app.get("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.statusMessage = "404 Not Found";
    res.status(404).end();
  }
});

//? Deleting a single note
app.delete("/api/notes/:id", (req, res) => {
  const id = +req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

//? creating a new note
app.use(express.json());
app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log(note);
  res.json();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
