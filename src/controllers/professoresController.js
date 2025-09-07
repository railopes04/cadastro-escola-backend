const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validarId = (id) => {
    const parsedId = parseInt(id);
    return !isNaN(parsedId) ? parsedId : null;
};

const listarProfessores = async (req, res) => {
    try {
        const professores = await prisma.professor.findMany();
        res.json({
            message: "Professores listados com sucesso",
            professores: professores
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar professores.' });
    }
};

const cadastrarProfessor = async (req, res) => {
    const { nome, email, idade } = req.body;
    try {
        const novoProfessor = await prisma.professor.create({
            data: {
                nome,
                email,
                idade: parseInt(idade),
            },
        });
        res.status(201).json({
            message: "Professor cadastrado com sucesso",
            professor: novoProfessor
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Erro: O e-mail fornecido já está em uso.' });
        }
        res.status(400).json({ error: 'Erro ao cadastrar professor. Verifique os dados fornecidos.' });
    }
};

const atualizarProfessor = async (req, res) => {
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
        const professorAtualizado = await prisma.professor.update({
            where: { id },
            data: dadosParaAtualizar,
        });
        res.json({
            message: "Professor atualizado com sucesso",
            professor: professorAtualizado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Erro: Professor não encontrado.' });
        }
        if (error.code === 'P2002') {
             return res.status(409).json({ error: 'Erro: O e-mail fornecido já está em uso.' });
        }
        res.status(500).json({ error: 'Erro ao atualizar professor.' });
    }
};

const deletarProfessor = async (req, res) => {
    const id = validarId(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'ID inválido.' });
    }

    try {
        const professorDeletado = await prisma.professor.delete({
            where: { id },
        });
        res.json({
            message: "Professor excluído com sucesso",
            professor: professorDeletado
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Erro: Professor não encontrado.' });
        }
        res.status(500).json({ error: 'Erro ao deletar professor.' });
    }
};

module.exports = {
    listarProfessores,
    cadastrarProfessor,
    atualizarProfessor,
    deletarProfessor,
};