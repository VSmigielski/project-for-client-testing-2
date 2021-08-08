import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSubject extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      subject: ''
    }
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const subject = {
      subject: this.state.subject
    }

    console.log(subject);

    axios.post('http://localhost:5000/subjects/add', subject)
      .then(res => console.log(res.data));

    this.setState({
      subject: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Subject</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Subject: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.subject}
                onChange={this.onChangeSubject}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Subject" className="btn btn-info mt-3" />
          </div>
        </form>
      </div>
    )
  }
}