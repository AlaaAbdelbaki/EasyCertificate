const router = require('express').Router();
let Notification = require('../models/Notification');

// /notifications/add
// add new notification

router.route("/add").post((req, res) => {
  console.log(req.body);
  const notif = new Notification(
    {
      title: req.body.title,
      content: req.body.content,
      user: req.body.user,
      profilePicture:req.body.profilePicture
    }
  );
  notif.save()
    .then(() => {
      res.json("Notification created successfully !")
    })
    .catch((err) => {
      console.log("error adding notification:\n" + err);
    });
});

// /notifications/read
// update notification and make isRead = true

router.route("/read").post((req, res) => {
  Notification.findById(req.body.id)
    .then(notif => {
      notif.isRead = true;
      notif.save();
    })
    .then(() => {
      res.json("Notification is now read !");
    })
    .catch((err) => {
      console.log("error updating notification:\n" + err);
    });
});

// /notifications
// get all notifications of user

router.route("/user/:id").get((req, res) => {
  Notification.find({
    user: req.params.id
  })
    .sort({ "createdAt": -1 })
    .then(notifs => {
      res.json(notifs);
    })
    .catch((err) => {
      console.log("Error obtaining notifications !:\n" + err);
    });
});

router.route("/deleteAll").get((req,res)=>{
  Notification.deleteMany()
  .then(()=>{
    res.json("Deleted !");
  })
  .catch((err)=>{
    res.json(err);
  });
});

module.exports = router;