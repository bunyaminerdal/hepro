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
  const { name,description} = req.body;
  //simple validation
  if (!name) {
    return res.status(400).json({ msg: "please enter name field" });
  }
  if(name.length<3){
    return res.status(400).json({ msg: "Name field must be at least 3 characters!" });
  }else if (name.length>30) {
    return res.status(400).json({ msg: "Name field must be less than 30 characters!" });
  }

  if (description.length>100) {
    return res.status(400).json({ msg: "Description field must be less than 100 characters!" });
  }
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

// @route UPDATE api/items/:id
// @desc update a item
// @access Private
router.put("/:id", auth, (req, res) => {  
  const { name,description} = req.body;
  //simple validation
  if (!name) {
    return res.status(400).json({ msg: "Please enter name field!" });
  }
  if(name.length<3){
    return res.status(400).json({ msg: "Name field must be at least 3 characters!" });
  }else if (name.length>30) {
    return res.status(400).json({ msg: "Name field must be less than 30 characters!" });
  }

  if (description.length>100) {
    return res.status(400).json({ msg: "Name field must be less than 100 characters!" });
  }
  /* Project.findById(req.params.id)
  .then((project) => project.updateOne({ "name" : req.body.name,"description":req.body.description }).then(() => res.json(project))); */
  Project.findByIdAndUpdate(req.params.id,req.body).then(() => res.json(req.body));
  
});

module.exports = router;
