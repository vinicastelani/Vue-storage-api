const express = require("express");
const CatalogItem = require("../models/CatalogItem");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await CatalogItem.create(req.body);
    return res.status(200).send({
      msg: { type: "success", data: "Item adicionado ao catálogo" },
    });
  } catch (err) {
    return res.status(400).send({
      msg: { type: "error", data: "Não foi possível adicionar o item" },
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const catalog = await CatalogItem.find().populate("createdBy");
    return res.status(200).send({
      msg: {
        type: "success",
        data: "Itens encontrados no catálogo estão disponíveis",
      },
      catalog,
    });
  } catch (msg) {
    return res.status(400).send({
      msg: {
        type: "error",
        data: "Não foi possível retornar os itens do catálogo",
      },
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CatalogItem.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ msg: { type: "sucess", data: "Item removido" } });
  } catch (msg) {
    return res.status(404).send({
      msg: {
        type: "error",
        data: "Não foi possível concluir a operação",
      },
    });
  }
});

module.exports = (app) => app.use("/catalog", router);
