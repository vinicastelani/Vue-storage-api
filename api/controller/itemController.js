const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.post("/", async (req, res) => {
  const { _id } = req.body;
  const { amount } = req.body;

  try {
    if (await Item.findOneAndUpdate({ _id }, { $inc: { amount: amount } }))
      return res.status(200).send({
        msg: { type: "success", data: "Item já existe. Acrescentado ao total" },
      });

    await Item.create(req.body);
    return res.status(200).send({
      msg: { type: "success", data: "Item adicionado ao armazém" },
    });
  } catch (err) {
    return res.status(400).send({
      msg: { type: "error", data: "Não foi possível adicionar o item" },
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const item = await Item.find().populate("createdBy").populate("addedBy");
    return res.status(200).send({
      msg: {
        type: "success",
        data: "Itens armazenados estão disponíveis",
      },
      item,
    });
  } catch (err) {
    return res.status(400).send({
      msg: {
        type: "error",
        data: "Nenhum item encontrado",
      },
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ msg: { type: "success", data: "Item removido" } });
  } catch (err) {
    return res.status(404).send({
      msg: {
        type: "error",
        data: "Não foi possível concluir a operação",
      },
    });
  }
});

module.exports = (app) => app.use("/storage", router);
