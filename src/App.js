import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import QuestionsList from "./components/questions-list.component";
import EditQuestion from "./components/edit-question.component";
import CreateQuestion from "./components/create-question.component";
import CreateUser from "./components/create-user.component";
import CreateDifficulty from "./components/create-difficulty.component";
import CreateTest from './components/create-test.component'
import NewTest from './components/test.component'
import CreateTime from './components/create-time.component'
import CreateSubject from './components/create-subject.component'
import Timer from './components/timer.component'

function App() {
  return (
    <Router>
      <div className="container-fluid">
      <Navbar />
      <br/>
      <div className="container">
        <Route path="/" exact component={QuestionsList} />
      <Route path="/edit/:id" component={EditQuestion} />
      <Route path="/create" component={CreateQuestion} />
      <Route path="/user" component={CreateUser} />
      <Route path="/difficulty" component={CreateDifficulty} />
      <Route path="/times" component={CreateTime} />
      <Route path="/subjects" component={CreateSubject} />
      <Route path="/createTest" component={CreateTest} />
      <Route path="/newTest" component={NewTest} />
      <Route path="/time-up" component={Timer} />

      </div>
      
      </div>
    </Router>
  );
}

export default App;
