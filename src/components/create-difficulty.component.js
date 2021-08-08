import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDifficulty extends Component {
  constructor(props) {
    super(props);

    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      difficulty: ''
    }
  }

  onChangeDifficulty(e) {
    this.setState({
      difficulty: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const difficulty = {
      difficulty: this.state.difficulty
    }

    console.log(difficulty);

    axios.post('http://localhost:5000/difficulty/add', difficulty)
      .then(res => console.log(res.data));

    this.setState({
      difficulty: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Difficulty</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Difficulty: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.difficulty}
                onChange={this.onChangeDifficulty}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Difficulty" className="btn btn-info mt-3" />
          </div>
        </form>
      </div>
    )
  }
}