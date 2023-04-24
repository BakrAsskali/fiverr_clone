const express = require("express");
const router = express.Router();

const Freelancer = require("../../models/freelancer");

router.get("/test", (req, res) => res.json({ msg: "Freelancers Works" }));

router.get("/", (req, res) => {
  User.find()
    .then((freelancers) => res.json(freelancers))
    .catch((err) =>
      res.status(404).json({ nofreelancerfound: "No freelancers found" })
    );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((freelancer) => res.json(freelancer))
    .catch((err) =>
      res
        .status(404)
        .json({ nofreelancerfound: "No freelancer found with that ID" })
    );
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then((freelancer) => res.json({ msg: "Freelancer added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this freelancer" })
    );
});

module.exports = router;
