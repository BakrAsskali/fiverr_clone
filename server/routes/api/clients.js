const express = require("express");
const router = express.Router();

const User = require("../../models/client");

router.get("/test", (req, res) => res.json({ msg: "Clients Works" }));

router.get("/", (req, res) => {
  User.find()
    .then((clients) => res.json(clients))
    .catch((err) =>
      res.status(404).json({ noclientfound: "No clients found" })
    );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((client) => res.json(client))
    .catch((err) =>
      res.status(404).json({ noclientfound: "No client found with that ID" })
    );
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then((client) => res.json({ msg: "Client added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this client" })
    );
});

module.exports = router;
