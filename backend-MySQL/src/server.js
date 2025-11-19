const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'alug',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
    }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ================= ROTAS USUÁRIO =================
app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE id_Usuario = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, email, telefone, senha, data_nascimento, url_imagem } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuario (nome, email, telefone, senha, data_nascimento, url_imagem) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, telefone, senha, data_nascimento, url_imagem]
        );
        const [novoUsuario] = await pool.query('SELECT * FROM Usuario WHERE id_Usuario = ?', [result.insertId]);
        res.status(201).json(novoUsuario[0]);
    } catch {
        res.status(500).json({ error: 'Erro ao adicionar usuário' });
    }
});

app.get('/imoveis', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar imóveis' });
    }
});

app.get('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Imoveis WHERE id_Imovel = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Imóvel não encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar imóvel' });
    }
});

app.post('/imoveis', upload.single('imagem'), async (req, res) => {

    const {
        titulo, tipo, area, quartos, banheiros,
        mobilia, numero_garagem, estado, cidade, bairro, rua,
        numero, cep, descricao, preco, usuario_id
    } = req.body;

    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const [result] = await pool.query(
            'INSERT INTO imoveis (titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, estado, cidade, bairro, rua, numero, cep, descricao, preco, url_imagem, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                titulo, tipo, area, quartos, banheiros, mobilia,
                numero_garagem, estado, cidade, bairro, rua,
                numero, cep, descricao, preco, imagem, usuario_id
            ]
        );

        const [novoImovel] = await pool.query(
            'SELECT * FROM imoveis WHERE id_imoveis = ?',
            [result.insertId]
        );

        res.status(201).json(novoImovel[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar imóvel' });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }

        res.json({ message: 'Login bem-sucedido', usuario: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao tentar fazer login' });
    }
});

app.listen(3000, () => {
    console.log('🔥 Servidor rodando na porta 3000 com upload de imagem ativado!');
});
