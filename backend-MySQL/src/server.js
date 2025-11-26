const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require("multer");
const path = require("path");
const { error } = require('console');

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

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// USUÁRIO

app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE id_usuario = ?',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(rows[0]);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, email, telefone, senha, url_imagem } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, telefone, senha,url_imagem) VALUES (?, ?, ?, ?, ?)',
            [nome, email, telefone, senha,  url_imagem]
        );

        const [novoUsuario] = await pool.query(
            'SELECT * FROM usuario WHERE id_usuario = ?',
            [result.insertId]
        );

        res.status(201).json(novoUsuario[0]);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, senha, url_imagem } = req.body;

    try {
        await pool.query(
            'UPDATE usuario SET nome=?, email=?, telefone=?, senha=?, url_imagem=? WHERE id_usuario=?',
            [nome, email, telefone, senha,  url_imagem, id]
        );

        const [usuarioAtualizado] = await pool.query(
            'SELECT * FROM usuario WHERE id_usuario = ?',
            [id]
        );

        res.json(usuarioAtualizado[0]);

    } catch {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM usuario WHERE id_usuario = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json({ message: 'Usuário deletado com sucesso' });

    } catch {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

// IMÓVEIS

app.get('/imoveis', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.*, img.url_imagem AS imagem
      FROM imoveis i
      LEFT JOIN imagens_imoveis img
        ON img.id_imagem = (
          SELECT id_imagem 
          FROM imagens_imoveis 
          WHERE imovel_id = i.id_imoveis 
          ORDER BY id_imagem ASC LIMIT 1
        )
    `);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});



app.get('/imoveis/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM imoveis WHERE id_imoveis = ?',
            [id]
        );

        if (rows.length === 0)
            return res.status(404).json({ error: 'Imóvel não encontrado' });

        res.json(rows[0]);

    } catch {
        res.status(500).json({ error: 'Erro ao buscar imóvel' });
    }
});

app.post('/imoveis', async (req, res) => {
    const {
        titulo, tipo, area, quartos, banheiros,
        mobilia, numero_garagem, estado, cidade, bairro, rua,
        numero, cep, descricao, preco, usuario_id
    } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO imoveis (titulo, tipo, area, quartos, banheiros, mobilia, numero_garagem, estado, cidade, bairro, rua, numero, cep, descricao, preco, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                titulo, tipo, area, quartos, banheiros, mobilia,
                numero_garagem, estado, cidade, bairro, rua,
                numero, cep, descricao, preco, usuario_id
            ]
        );


        const [novoImovel] = await pool.query(
            'SELECT * FROM imoveis WHERE id_imoveis = ?',
            [result.insertId]
        );

        res.status(201).json(novoImovel[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
    }
});

app.put('/imoveis/:id', async (req, res) => {
    const { id } = req.params;

    const {
        titulo, tipo, area, quartos, banheiros,
        mobilia, numero_garagem, estado, cidade, bairro, rua,
        numero, cep, descricao, preco, usuario_id
    } = req.body;

    try {
        await pool.query(
            'UPDATE imoveis SET titulo=?, tipo=?, area=?, quartos=?, banheiros=?, mobilia=?, numero_garagem=?, estado=?, cidade=?, bairro=?, rua=?, numero=?, cep=?, descricao=?, preco=?, usuario_id=?  WHERE id_imoveis=?',
            [
                titulo, tipo, area, quartos, banheiros, mobilia,
                numero_garagem, estado, cidade, bairro, rua,
                numero, cep, descricao, preco, usuario_id, id
            ]
        );

        const [imovelAtualizado] = await pool.query(
            'SELECT * FROM imoveis WHERE id_imoveis = ?',
            [id]
        );

        res.json(imovelAtualizado[0]);

    } catch {
        res.status(500).json({ error: 'Erro ao atualizar imovel' });
    }
});

app.delete('/imoveis/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM imoveis WHERE id_imoveis = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Imovel não encontrado' });

        res.json({ message: 'Imóvel deletado com sucesso' });

    } catch {
        res.status(500).json({ error: 'Erro ao deletar imovel' });
    }
});


// IMAGENS 

app.post('/imagens', upload.single("url_imagem"), async (req, res) => {
    const { imovel_id } = req.body;

    if (!req.file) return res.status(400).json({ error: "Nenhuma imagem enviada" });

    const url_imagem = "/uploads/" + req.file.filename;

    try {
        const [result] = await pool.query(
            'INSERT INTO imagens_imoveis (imovel_id, url_imagem) VALUES (?, ?)',
            [imovel_id, url_imagem]
        );

        const [novaImagem] = await pool.query(
            'SELECT * FROM imagens_imoveis WHERE id_imagem = ?',
            [result.insertId]
        );

        res.status(201).json(novaImagem[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao adicionar imagem' });
    }
});

app.get('/imagens', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM imagens_imoveis');
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar imagens' });
    }
});

app.get('/imagens/imovel/:id_imovel', async (req, res) => {
    const { id_imovel } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM imagens_imoveis WHERE imovel_id = ?',
            [id_imovel]
        );
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar imagens do imóvel' });
    }
});

app.delete('/imagens/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM imagens_imoveis WHERE id_imagem = ?',
            [id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: 'Imagem não encontrada' });

        res.json({ message: 'Imagem deletada com sucesso' });

    } catch {
        res.status(500).json({ error: 'Erro ao deletar imagem' });
    }
});


// LOGIN

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (rows.length === 0)
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });

        res.json({ message: 'Login bem-sucedido', usuario: rows[0] });

    } catch {
        res.status(500).json({ error: 'Erro ao tentar fazer login' });
    }
});


// SERVIDOR

app.listen(3000, () => {
    console.log('🔥 Servidor rodando na porta 3000');
});
