const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Dm = require("../../models/decisionmaker");

// @route GET api/items
// @desc GET all Items
// @access Public
router.get("/", auth, (req, res) => {
  Dm.find({ ownerId: req.project.id })
    .sort({ date: -1 })
    .then((dms) => res.json(dms));
});

// @route POST api/items
// @desc Create a item
// @access Private (2.parametre olarak auth ekledik)
router.get("/dm", auth, (req, res) => {
  res.send("ahaburdasın");
  /* const newDm = new Dm({
    ownerId: req.project.id,
    name: req.body.name,
  });

  newDm.save().then((dm) => res.json(dm)); */
});

/* // @route DELETE api/items/:id
// @desc Delete a item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
}); */

module.exports = router;
