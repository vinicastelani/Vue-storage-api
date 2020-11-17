const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    return res.status(200).send({ item });
  } catch (err) {
    return res.status(400).send({
      err: "Não foi possível adicionar o item ao banco",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const item = await Item.find().populate("createdBy");
    return res.status(200).send({ item });
  } catch (err) {
    return res.status(400).send({
      err: "Não foi possível retornar nenhum item do banco",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ message: "Item removido do banco", log: item });
  } catch (err) {
    return res
      .status(404)
      .send({ err: "Não foi possível concluir a operação", log: req.body });
  }
});

module.exports = (app) => app.use("/storage", router);
