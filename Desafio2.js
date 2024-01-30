import express, {Request, Response} from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const users = [
  { id: 1, nome: "Aline", idade: 30, profissao: "Desenvolvedora" },
  { id: 2, nome: "Maria", idade: 40, profissao: "Tech Lead" },
];

app.get("/", (req, res) => res.send("Bem-vindo ao meu web service!"));

app.get("/users", (req, res) => res.send(users));

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  return user
    ? res.send(user)
    : res.status(404).json({ error: "Usuário não encontrado" });
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    nome: req.body.nome,
    idade: req.body.idade,
    profissao: req.body.profissao,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/saudacao/:nome", (req, res) =>
  res.send(`Olá, ${req.params.nome} ! Tudo Bem? Seja bem-vindo ao servidor`)
);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);