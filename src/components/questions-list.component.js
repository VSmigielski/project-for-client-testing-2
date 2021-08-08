import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Question = props => (
  <tr>
    <td>{props.question.username}</td>
    <td>{props.question.description}</td>
    <td>{props.question.difficulty}</td>
    <td>{props.question.date.substring(0,10)}</td>
    <td>
      <button><Link to={"/edit/"+props.question._id}>edit</Link></button> | <button onClick={() => { props.deleteQuestions(props.question._id) }}>delete</button>
    </td>
  </tr>
)

export default class QuestionsList extends Component {
  constructor(props) {
    super(props);

    this.deleteQuestion = this.deleteQuestion.bind(this)

    this.state = {questions: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/questions/')
      .then(response => {
        this.setState({ questions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteQuestion(id) {
    axios.delete('http://localhost:5000/questions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      questions: this.state.questions.filter(el => el._id !== id)
    })
  }

  questionList() {
    return this.state.questions.map(currentquestion => {
      return <Question question={currentquestion} deleteQuestions={this.deleteQuestion} key={currentquestion._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Questions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.questionList() }
          </tbody>
        </table>
      </div>
    )
  }
}