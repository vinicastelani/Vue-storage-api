const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.json");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(404).send({
        msg: { type: "error", data: "Este email já está em uso." },
      });

    const user = await User.create(req.body);
    user.password = undefined;
    return res.status(200).send({
      msg: { type: "success", data: "Usuário criado" },
      log: user,
    });
  } catch (err) {
    return res.status(404).send({
      msg: { type: "error", data: "Não foi posssível criar o usuário" },
      log: req.body,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send({
        msg: { type: "error", data: "Usuário não encontrado" },
      });
    }

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({
        msg: { type: "error", data: "Senha inválida" },
      });
    const token = jwt.sign({ id: user._id }, config.secret);
    user.password = undefined;
    return res.status(200).send({
      msg: { type: "success", data: "Logando..." },
      log: user,
      token,
    });
  } catch (err) {
    return res.status(404).send({
      msg: { type: "error", data: "Não foi possível concluir a operação" },
    });
  }
});

module.exports = (app) => app.use("/user", router);
