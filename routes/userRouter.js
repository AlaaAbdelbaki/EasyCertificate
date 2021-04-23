const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
var multer = require('multer');

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset',auth, userCtrl.resetPassword)

router.get('/infor',auth, userCtrl.getUserInfor)

router.get('/all_infor',auth, authAdmin , userCtrl.getUsersAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

// Social Login

router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/public/img/profilePictures');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
      // cb(null,file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/*") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    // fileFilter : fileFilter
  }).single("profilePicture");
  //Setup end

  
  let User = require('../models/userModel');
  
  //Bcrypt
  const bcrypt = require('bcrypt');
  const { findById } = require('../models/userModel');
  const saltRounds = 10;
  
  
  //Shows all users
  // /users/
  router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  //Gets user by profileUrl
  // /users/find
  router.route('/find').get(async (req, res) => {
    await User.find({
      email: req.query.email,
    })
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });
  
  // Gets user by ID
  // /users/:profileId
  router.route('/:profileId').get(async (req, res) => {
    await User.find({
      profileId: req.params.profileId
    })
      .select("-password")
      .then(user => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });
  
  //Creates a new User
  // /users/add
  router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const name = req.body.name;
    const lastName = req.body.lastName;
  
    const newUser = new User({ email, password, name, lastName });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


  //Deletes the user
  // /users/delete/:id
  router.route("/delete/:id").delete((req, res) => {
    const user = User.findByIdAndDelete(req.params.id)
      .then(() => res.json("deleted successfully"))
      .catch((err) => res.status(400).json("could not delete ! Error: " + err));
  });
  
  //updates the user
  // /user/update/:id
  router.route("/update/:id").post(upload, (req, res) => {
    console.log(req.body);
    var filePath = "";
    if(req.file != null){
      filePath = req.file.path;
      console.log(filePath)
      filePath = filePath.substr(filePath.lastIndexOf('\\') + 1, filePath.length);
    }
  
    console.log(filePath);
    User.findById(req.params.id)
      .then(user => {
        user.email = req.body.email;
        user.name = req.body.name;
        user.lastName = req.body.lastName;
        if (req.file != null) {
          user.profilePicture = filePath;
        }
        user.profileId = req.body.profileId;
        user.city = req.body.city;
        user.country = req.body.country;
        user.bio = req.body.bio;
        user.facebook = req.body.facebook;
        user.twitter = req.body.twitter;
        user.linkedin = req.body.linkedin;
  
        user.save()
          .then(() => res.status(200).json("updated successfully !"))
          .catch((err) => {
            res.status(400).json("Error: " + err);
            console.log(err);
          });
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
        console.log(err);
      });
  });




module.exports = router