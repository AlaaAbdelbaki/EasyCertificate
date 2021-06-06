const router = require('express').Router();
let Job = require('../models/Job');
const { findById } = require('../models/Job');


//Shows all Jobs
// /Jobs/
router.route('/').get((req, res) => {
  Job.find()
    .then(Jobs => res.json(Jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Gets Job by ID
// /Jobs/:id
router.route('/:id').get(async (req, res) => {
  await Job.find({
    "user": req.params.id
  }
  )
    .then(Job => res.json(Job))
    .catch(err => res.status(400).json("Error: " + err));
});


//Creates a new Job
// /Jobs/add
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const company = req.body.company;
  const started = req.body.started;
  const left = req.body.left;
  const user = req.body.userId;

  const newJob = new Job({ title, company, started, left, user });

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Deletes the Job
// /Jobs/delete/:id
router.route("/delete/:id").delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch((err) => res.status(400).json("could not delete ! Error: " + err));
});

//updates the Job
// /Jobs/update/:id
router.route("/update/:id").post((req, res) => {
  Job.findById(req.params.id)
    .then(job => {

      job.title = req.body.title;
      job.company = req.body.company;
      job.started = req.body.started;
      job.left = req.body.left;

      job.save()
        .then(() => res.json("updated successfully !"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;