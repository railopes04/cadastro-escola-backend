const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validarId = (id) => {
    const parsedId = parseInt(id);
    return !isNaN(parsedId) ? parsedId : null;
};

const listarAlunos = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        res.json({
            message: "Alunos listados com sucesso",
            alunos: alunos
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos.' });
    }
};

const cadastrarAluno = async (req, res) => {
    const { nome, email, idade } = req.body;
    try {
        const novoAluno = await prisma.aluno.create({
            data: {
                nome,
                email,
                idade: parseInt(idade),
            },
        });
        res.status(201).json({
            message: "Aluno cadastrado com sucesso",
            aluno: novoAluno
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Erro: O e-mail fornecido já está em uso.' });
        }
        res.status(400).json({ error: 'Erro ao cadastrar aluno. Verifique os dados fornecidos.' });
    }
};

const atualizarAluno = async (req, res) => {
    const id = validarId(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'ID inválido.' });
    }

    const { nome, email, idade } = req.body;
    
    const dadosParaAtualizar = {};
    if (nome) dadosParaAtualizar.nome = nome;
    if (email) dadosParaAtualizar.email = email;
    if (idade !== undefined) dadosParaAtualizar.idade = parseInt(idade);

    try {
        const alunoAtualizado = await prisma.aluno.update({
            where: { id },
            data: dadosParaAtualizar,
        });
        res.json({
            message: "Aluno atualizado com sucesso",
            aluno: alunoAtualizado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Erro: Aluno não encontrado.' });
        }
        if (error.code === 'P2002') {
             return res.status(409).json({ error: 'Erro: O e-mail fornecido já está em uso.' });
        }
        res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    }
};

const deletarAluno = async (req, res) => {
    const id = validarId(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'ID inválido.' });
    }

    try {
        const alunoDeletado = await prisma.aluno.delete({
            where: { id },
        });
        res.json({
            message: "Aluno excluído com sucesso",
            aluno: alunoDeletado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Erro: Aluno não encontrado.' });
        }
        res.status(500).json({ error: 'Erro ao deletar aluno.' });
    }
};

module.exports = {
    listarAlunos,
    cadastrarAluno,
    atualizarAluno,
    deletarAluno,
};