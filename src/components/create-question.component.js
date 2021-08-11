import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      answer: '',
      difficulty: '',
      subject: '',
      date: new Date(),
      users: [],
      difficulties: [],
      subjects: [], 
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/difficulty/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            difficulties: response.data.map(difficult => difficult.difficulty),
            difficulty: response.data[0].difficulty
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/subjects/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            subjects: response.data.map(subject => subject.subject),
            subject: response.data[0].subject
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeAnswer(e) {
    this.setState({
      answer: e.target.value
    })
  }

  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    })
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const question = {
      username: this.state.username,
      description: this.state.description,
      answer: this.state.answer,
      difficulty: this.state.difficulty,
      subject: this.state.subject,
      date: this.state.date
    }

    console.log(question);

    axios.post('http://localhost:5000/questions/add', question)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Question Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group mt-2"> 
          <label>Question: </label>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group mt-2"> 
          <label>Answer: </label>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.answer}
              onChange={this.onChangeAnswer}
              />
        </div>
        <div className="form-group mt-2">
          <label>Difficulty: </label>
          <select ref="difficultyInput"
              required
              className="form-control"
              value={this.state.difficulty}
              onChange={this.onChangeDifficulty}>
              {
                this.state.difficulties.map(function(difficulty) {
                  return <option 
                    key={difficulty}
                    value={difficulty}>{difficulty}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group mt-2">
          <label>Subject: </label>
          <select ref="subjectInput"
              required
              className="form-control"
              value={this.state.subject}
              onChange={this.onChangeSubject}>
              {
                this.state.subjects.map(function(subject) {
                  return <option 
                    key={subject}
                    value={subject}>{subject}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group mt-2">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Question Log" className="mt-3 btn btn-info" />
        </div>
      </form>
    </div>
    )
  }
}