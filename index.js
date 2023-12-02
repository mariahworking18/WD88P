import express from "express";
import morgan  from "morgan";
import cors from "cors";



const PORT =  3000;
// process.env.PORT ||

const app = express();

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(cors());

app.use(express.json());

app.use(morgan(":method :status :url :body"));


let persons = [
    {
        id: 1,
        name: "Arturo Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Locelace",
        number: "39-44-53232323",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-202020",
    },
];


function logger(req, res, nxt) {
    console.log('method: $')


}

function generateId() { 
    const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

    return maxId +1 ;
}

function unknownEndpoint(req, res) {
    res.status(404).send({error: "unknown endpoit"});

}





app.get("/", (req, res) => {
    return res.send("<h1>My Assignment from scratch</h1>");
});

app.get("/persons", (req, res)  => {
    return res.json(persons);

});

app.get("/persons/info", (req, res) =>{

const personsCount = persons.length;

    return res.json(`Phonebook has info for ${personsCount}`)
    
})

app.get("/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => person.id === id);

    res.json(person);
});

app.delete("/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);

    res.status(204).end();
});

app.post("/persons",  (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({error: "content missing"});
    }

    const person = {
        id : generateId(),
        name : body.name,
        number : body.number || false,

    };

    
    persons = persons.concat(person);
    res.status(201).json(person);
    // return res.json(person);
    // console.log(person);
});

app.use(unknownEndpoint);


app.listen(PORT, ()=> {
    console.log(`Server is now running on port ${PORT}`);
});