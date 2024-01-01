const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Dm = require("../../models/decisionmaker");

// @route GET api/items
// @desc GET all Items
// @access Public
router.get("/:id", auth, (req, res) => {
  Dm.find({ ownerId: req.params.id })
    .sort({ date: -1 })
    .then((dms) => res.json(dms));
});

// @route POST api/items
// @desc Create a item
// @access Private (2.parametre olarak auth ekledik)
router.post("/:id", auth, (req, res) => {
  const { name} = req.body;
  //simple validation
  if (!name) {
    return res.status(400).json({ msg: "Please enter name field!" });
  }
  if(name.length<3){
    return res.status(400).json({ msg: "Name field must be at least 3 characters!" });
  }else if (name.length>30) {
    return res.status(400).json({ msg: "Name field must be less than 30 characters!" });
  }

  const newDm = new Dm({
    ownerId: req.params.id,
    name: req.body.name,
  });

  newDm.save().then((dm) => res.json(dm));
});

// @route DELETE api/items/:id
// @desc Delete a item
// @access Private
router.delete("/:id", auth, (req, res) => {
  Dm.findById(req.params.id)
    .then((dm) => dm.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
// @route UPDATE api/items/:id
// @desc update a item
// @access Private
router.put("/:id", auth, (req, res) => {
  const { name} = req.body;
  //simple validation
  if (!name) {
    return res.status(400).json({ msg: "Please enter name field!" });
  }
  if(name.length<3){
    return res.status(400).json({ msg: "Name field must be at least 3 characters!" });
  }else if (name.length>30) {
    return res.status(400).json({ msg: "Name field must be less than 30 characters!" });
  }
  /* Project.findById(req.params.id)
  .then((project) => project.updateOne({ "name" : req.body.name,"description":req.body.description }).then(() => res.json(project))); */
  Dm.findByIdAndUpdate(req.params.id,req.body).then(() => res.json(req.body));
  
});

module.exports = router;
