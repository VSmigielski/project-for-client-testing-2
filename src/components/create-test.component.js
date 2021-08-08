import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class CreateTest extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            subject: '',
          time: '',
          difficulty: '',
          difficulties: [],
          times: [],
          subjects: [],
        }
      }

      componentDidMount() {
    
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

          axios.get('http://localhost:5000/times/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                times: response.data.map(time => time.time),
                time: response.data[0].time
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

      onChangeTime(e) {
        this.setState({
          time: e.target.value
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

      onSubmit(e) {
        e.preventDefault();
    
        const question = {
          username: this.state.username,
          description: this.state.description,
          difficulty: this.state.difficulty,
          date: this.state.date
        }

        console.log(question);

    axios.post('http://localhost:5000/questions/add', question)
      .then(res => console.log(res.data));

    window.location = '/';
    }

    render () {
       return (
        <>
            <h3>Create New Test</h3>
      <form onSubmit={this.onSubmit}>
        
        <div className="form-group"> 
          <label>Time to Take: </label>
          <select
              required
              className="form-control"
              value={this.state.time}
              onChange={this.onChangeTime}>
              {
                this.state.times.map(function(time) {
                  return <option 
                    key={time}
                    value={time}>{time} minutes
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Difficulty: </label>
          <select
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
        <div className="form-group">
          <label>Subject: </label>
          <select 
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

        <div className="form-group">
          <Link to={{
              pathname: '/newTest',
              state: {
                  subject: this.state.subject,
                  time: this.state.time,
                  difficulty: this.state.difficulty
              }
          }} type="submit" className="mt-3 btn btn-info">Create Test</Link>
        </div>
      </form>
        </>
    ) 
    }
    
}
