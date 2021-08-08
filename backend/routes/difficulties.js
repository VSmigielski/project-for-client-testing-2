const router = require('express').Router();
let Difficulty = require('../models/difficulty.model');

router.route('/').get((req, res) => {
    Difficulty.find()
    .then(difficulty => res.json(difficulty))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const difficulty = req.body.difficulty;
    const newDifficulty = new Difficulty({difficulty});

    newDifficulty.save()
    .then(() => res.json('Difficulty added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;