const router = require('express').Router();
let Time = require('../models/time.model');

router.route('/').get((req, res) => {
    Time.find()
    .then(times => res.json(times))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const time = req.body.time;
    const newTime = new Time({time});

    newTime.save()
    .then(() => res.json('Time added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;