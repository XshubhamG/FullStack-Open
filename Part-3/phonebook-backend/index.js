import cors from "cors";
import express from "express";
import morgan from "morgan";
const app = express();

app.use(cors());
//? phonebook
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//? unknown endpoint
const unknownendPoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

//? morgan custom token
morgan.token("body", (req) => JSON.stringify(req.body));

//? using the morgan logger
app.use(morgan(":method :url :status :body"));

//? Home route
app.get("/", (_, res) => {
  res.send(`<div>
    <h1>Hello World!</h1>
    <a href="/info">Info</a>
    <a href="/api/persons">Persons</a>
    </div>`);
});

//? Info route
app.get("/info", (_, res) => {
  res.send(`<div>
<p> Phonebook has info for ${persons.length} people </p>
<p> ${new Date()}</p>
<a href="/api/persons">API</a>
<a href="/">Home</a>
</div>`);
});

//? Api route
app.get("/api/persons", (_, res) => {
  res.send(persons);
});

//? Person route
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

//? delete a person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

//? add a person
app.use(express.json());
app.post(`/api/persons`, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

//? using unknownendPoint
app.use(unknownendPoint);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
