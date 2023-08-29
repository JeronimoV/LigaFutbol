const app = require("express").Router();
const { login, register } = require("../controllers/userController");

app.post("/", login);
app.post("/register", register);

module.exports = app;
