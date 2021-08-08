const router = require('express').Router();
let Subject = require('../models/subject.model');

router.route('/').get((req, res) => {
    Subject.find()
    .then(subject => res.json(subject))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const subject = req.body.subject;
    const newSubject = new Subject({subject});

    newSubject.save()
    .then(() => res.json('Subject added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;