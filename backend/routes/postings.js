const router = require('express').Router();
let Posting = require('../models/posting.model');

//Get route
router.route('/').get((req, res) => {
    Posting.find()
        .then(postings => res.json(postings))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Post route
router.route('/post').post((req, res) => {

    const createdby = req.body.createdby;
    const image = req.body.image;
    const description = req.body.description;
    const likes=0;
    const comments=0;

    const newPosting = new Posting({ createdby, image, description, likes, comments });

    newPosting.save()
        .then(() => res.json('Created a posting !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete route
router.route('/:id').delete((req, res) => { 
    Posting.findByIdAndDelete(req.params.id) 
        .then(() => res.json('Posting deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Update route
router.route('/update/:id').post((req, res) => { 
    Posting.findById(req.params.id) 
        .then(posting => {
            posting.image = req.body.image; // then update each row. Assign inputted new data to matching existing row.
            posting.description = req.body.description;

            posting.save()
                .then(() => res.json('Posting updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;