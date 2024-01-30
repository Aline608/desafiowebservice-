import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {

    res.send("Bem vindo ao meu web service!");

});

const porta: number = 3003;

app.listen(porta, () => {

    console.log(`Servidor rodando em http://localhost:${porta}`);

});


const usuarios = [

    { id: 1, nome: "Aline"},
    
    { id: 2, nome: "Maria" },

    { id: 3, nome: "Karina" },
    
    ];


app.get("/usuarios", (req: Request, res: Response) => {

    res.send(usuarios);
    
    });

app.get("/usuarios/:id", (req: Request, res: Response) => {

    const usuario = usuarios.find((l) => l.id === parseInt(req.params.id));
    
    if (!usuario) {
    
    return res.status(404).json({ error: "Usuário não encontrado" });
    
    }
    
    res.send(usuario);
    
    });

app.post("/usuarios", (req: Request, res: Response) => {

    const novoUsuario = {
    
    id: usuarios.length + 1,
    
    nome: req.body.nome,
    
    };
    
    if (novoUsuario && novoUsuario.nome) {
        novoUsuario.id = usuarios.length + 1;
        usuarios.push(novoUsuario);

        res.status(201).json({ mensagem: 'Usuário adicionado com sucesso!' });
    } else {
        res.status(400).json({ mensagem: 'Dados inválidos para adicionar usuário!' });
    }
    
    });

app.get('/saudacao/:nome', (req, res) => {
    const nome = req.params.nome;
    res.json({ mensagem: `Olá, ${nome}! Tudo bem? Seja bem-vindo ao servidor!` });
});