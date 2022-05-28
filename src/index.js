const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

// Importando las Variables de Entorno
const {port, secret} = require("./config");
// Importando las Rutas
const auth = require("./routes/auth");
const admin = require("./routes/admin");

const app = express();

// Usando registros con morgan
app.use(morgan("dev"));
// Configurando Archivos Estáticos
app.use(express.static(path.join(__dirname, "static")));
// Configurando Template Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// Configurando la Sesión
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false,
}));

// Utilizando Rutas
auth(app);
admin(app);

app.get("/", (req, res) => {
  return res.render("home");
});
app.get("/notAllowed", (req, res) => {
  return res.render("notAllowed");
});
app.all("*", (req, res) => {
  return res.render("notFound");
})

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});