import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTime extends Component {
  constructor(props) {
    super(props);

    this.onChangeTime = this.onChangeTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      time: ''
    }
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const time = {
      time: this.state.time
    }

    console.log(time);

    axios.post('http://localhost:5000/times/add', time)
      .then(res => console.log(res.data));

    this.setState({
      time: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Time</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Time: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.time}
                onChange={this.onChangeTime}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Time" className="btn btn-info mt-3" />
          </div>
        </form>
      </div>
    )
  }
}