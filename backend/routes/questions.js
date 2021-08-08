const router = require('express').Router();
let Question = require('../models/questions.model');

// Gets all questions from DB
router.route('/').get((req, res) => {
  Question.find()
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/Easy').get((req, res) => {
    Question.find({ difficulty: "Easy" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/Medium').get((req, res) => {
    Question.find({ difficulty: "Medium" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/Hard').get((req, res) => {
    Question.find({ difficulty: "Hard" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const difficulty = req.body.difficulty;
  const date = Date.parse(req.body.date);

  const newQuestion = new Question({
    username,
    description,
    difficulty,
    date,
  });

  newQuestion.save()
  .then(() => res.json('Question added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json('Question deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      question.username = req.body.username;
      question.description = req.body.description;
      question.difficulty = req.body.difficulty;
      question.date = Date.parse(req.body.date);

      question.save()
        .then(() => res.json('Question updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;