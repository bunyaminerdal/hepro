const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Value = require("../../models/value");

// @route GET api/items
// @desc GET all Items
// @access Public
router.get("/:id", auth, (req, res) => {
  Value.find({ ownerId: req.params.id })
    .sort({ date: -1 })
    .then((vals) => res.json(vals));
});

// @route POST api/items
// @desc Create a item
// @access Private (2.parametre olarak auth ekledik)
router.post("/:id", auth, (req, res) => {
  const input = req.body[0];
  //simple validation
  if (!input) {
    return res.status(400).json({ msg: "Please enter input field!" });
  }
  if (input.length > 20) {
    return res
      .status(400)
      .json({ msg: "input field must be less than 20 characters!" });
  }

  const newVal = new Value({
    ownerId: req.params.id,
    dmId: req.body[1],
    criteriaId: req.body[2],
    alternativeId: req.body[3],
    input: req.body[0],
  });

  newVal.save().then((val) => res.json(val));
});

// @route DELETE api/items/:id
// @desc Delete a item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Value.findById(req.params.id)
    .then((val) => val.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
// @route UPDATE api/items/:id
// @desc update a item
// @access Private
router.put("/:id", auth, (req, res) => {
  const { input } = req.body;
  //simple validation
  if (!input) {
    return res.status(400).json({ msg: "Please enter input field!" });
  }
  if (input.length > 20) {
    return res
      .status(400)
      .json({ msg: "input field must be less than 20 characters!" });
  }
  /* Project.findById(req.params.id)
  .then((project) => project.updateOne({ "input" : req.body.input,"description":req.body.description }).then(() => res.json(project))); */
  Value.findByIdAndUpdate(req.params.id, req.body).then(() =>
    res.json(req.body)
  );
});

module.exports = router;
