const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { startDB } = require("./models");
const routes = require('./routes');

// Helmet para segurança de cabeçalhos HTTP
app.use(helmet());

// Rate Limiting para prevenir ataques de força bruta e DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP por janela de tempo
});
app.use(limiter);

// Sanitização de dados para prevenir injeção de SQL e XSS
app.use(mongoSanitize());
app.use(xss());

// Configuração de CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Usar a variável de ambiente
  credentials: true, // Permite o envio de cookies
}));

// Segurança de Cookies
app.use((req, res, next) => {
  res.cookie('session', '1', { httpOnly: true, secure: true, sameSite: 'strict' });
  next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen({ port: 3001 }, async () => {
  startDB();
});