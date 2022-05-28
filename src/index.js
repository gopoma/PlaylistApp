const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

// Importando las Variables de Entorno
const {port, secret} = require("./config");

const app = express();

// Usando registros con morgan
app.use(morgan("dev"));

app.use(session({
  secret,
  resave: false,
  saveUninitialized: false,
}));

app.get("/", (req, res) => {
  return res.json({title:"music-favs-application"});
});

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});