const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'suaChaveSecreta'; // Substitua por uma chave secreta real

app.use(express.json());

// Rota de autenticação que gera um token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulação de autenticação (substitua por uma autenticação real)
  if (username === 'usuario' && password === 'senha') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Falha na autenticação' });
  }
});

// Middleware de autenticação JWT para rotas protegidas
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

// Rota protegida para adicionar usuários
app.post('/adicionar-usuario', authenticateToken, (req, res) => {
  // Verifique se o usuário está autenticado antes de adicionar um usuário (exemplo simples)
  const { user } = req;

  if (user) {
    // Lógica para adicionar um usuário
    res.json({ message: 'Usuário adicionado com sucesso' });
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
});

// Rota pública
app.get('/publica', (req, res) => {
  res.json({ message: 'Esta rota é pública e não requer autenticação' });
});

app.listen(port, () => {
  console.log(`Servidor Node.js está ouvindo na porta ${port}`);
});


// ecexutar comando node server.js para rodar o servidor