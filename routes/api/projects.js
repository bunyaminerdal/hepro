const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Project = require("../../models/project");

// @route GET api/items
// @desc GET all Items
// @access Public
router.get("/", auth, (req, res) => {
  Project.find({ ownerId: req.user.id })
    .sort({ date: -1 })
    .then((projects) => res.json(projects));
});

// @route POST api/items
// @desc Create a item
// @access Private (2.parametre olarak auth ekledik)
router.post("/", auth, (req, res) => {
  const newProject = new Project({
    ownerId: req.user.id,
    name: req.body.name,
    description: req.body.description,
  });

  newProject.save().then((project) => res.json(project));
});

// @route DELETE api/items/:id
// @desc Delete a item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
