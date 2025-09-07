const express = require('express');
const alunosRoutes = require('./routes/alunosRoutes');
const professoresRoutes = require('./routes/professoresRoutes');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Para ler dados via x-for
app.use(express.json()); // Para ler dados em json

// Rotas
app.use('/alunos', alunosRoutes);
app.use('/professores', professoresRoutes);

// Rota inicial para teste
app.get('/', (req, res) => {
    res.send('API de Cadastro de Alunos e Professores está online!');
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
