import React, { Component } from 'react';
import axios from 'axios';

const QuestionPiece = props => (
    <article className="question">
    <div className="question-footer">
      <h3>{props.question.description}</h3>
    </div>
    </article>
)

export default class BigTest extends Component {
  constructor(props) {
    super(props);

    this.state = {questions: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/questions/`)
      .then(response => {
        this.setState({ questions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })


  }

  questionList() {
    return this.state.questions.map(currentquestion => {
      return <QuestionPiece question={currentquestion} key={currentquestion._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Questions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Description</th>
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