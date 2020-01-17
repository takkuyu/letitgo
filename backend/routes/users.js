const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))// get users from the db and return them in JSON format
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({ username, email, password });

    newUser.save()
        .then(() => res.json('User registered !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signin').post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email, password})
  
        .then((user) => {
            if(user){
                 res.json('signin success');
            }else{
                 res.json('');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

//Delete route 
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;