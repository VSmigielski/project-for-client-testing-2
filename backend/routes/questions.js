const router = require('express').Router();
let Question = require('../models/questions.model');

// Gets all questions from DB
router.route('/').get((req, res) => {
  Question.find()
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All easy level questions
router.route('/Easy').get((req, res) => {
    Question.find({ difficulty: "Easy" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// All medium level questions
  router.route('/Medium').get((req, res) => {
    Question.find({ difficulty: "Medium" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// All hard level questions
  router.route('/Hard').get((req, res) => {
    Question.find({ difficulty: "Hard" })
      .then(question => res.json(question))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// All easy level questions with subject Math
router.route('/EasyMath').get((req, res) => {
  Question.find({ difficulty: "Easy", subject: "Math" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All medium level questions Math
router.route('/MediumMath').get((req, res) => {
  Question.find({ difficulty: "Medium", subject: "Math" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All hard level questions Math
router.route('/HardMath').get((req, res) => {
  Question.find({ difficulty: "Hard", subject: "Math" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All easy level questions with subject Web Dev
router.route('/EasyWebDev').get((req, res) => {
  Question.find({ difficulty: "Easy", subject: "WebDev" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All medium level questions Web Dev
router.route('/MediumWebDev').get((req, res) => {
  Question.find({ difficulty: "Medium", subject: "WebDev" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

// All hard level questions Web Dev
router.route('/HardWebDev').get((req, res) => {
  Question.find({ difficulty: "Hard", subject: "WebDev" })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const answer = req.body.answer;
  const difficulty = req.body.difficulty;
  const subject = req.body.subject;
  const date = Date.parse(req.body.date);

  const newQuestion = new Question({
    username,
    description,
    answer,
    difficulty,
    subject,
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
      question.answer = req.body.answer;
      question.difficulty = req.body.difficulty;
      question.subject = req.body.subject;
      question.date = Date.parse(req.body.date);

      question.save()
        .then(() => res.json('Question updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;