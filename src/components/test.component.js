import React, {useState, useCallback, useEffect, useRef} from 'react'
import Loading from './loading.component'
import axios from 'axios'
import TestQuestion from './test-list.component'
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Stopwatch from './react-stopwatch.component'

const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}

const Test = (props) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const {subject, time, difficulty} = location.state
    const [questions, setQuestions] = useState([]);
    const [secondsRemaining, setSecondsRemaining] = useState(time * 60)
    const [status, setStatus] = useState(STATUS.STOPPED)
    const [elapsedTime, setElapsedTime] = useState(null);

    const url = "http://localhost:5000/questions/"

    const getQuestions = useCallback(async () => {
        axios
  .get(`${url}${difficulty}${subject}`)
  .then(response => {
      if (response.data.length > 0) {
          setQuestions(response.data.map(question => question))
      }
  })
  .catch(function (error) {
    console.log(error);
 });
}, [difficulty]);

const handleSubmit = (e) => {
    e.preventDefault();
}


/* const chooseRandom = (arr, num = 1) => {
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 }; */
 
    
      useEffect(() => {
        getQuestions()
        setLoading(false)
        handleStart();
    }, [difficulty, getQuestions])


  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(time)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else if (secondsRemaining === 0) {
        window.location = '/time-up';
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )
      
    if (loading) {
        return <Loading/>
     }

    return (
        <>
        <section className="section">
            <div className="upper-area-test">
            <h2 className="section-title">Questions</h2>
            <div className="section-timer">{/* { minutes === 0 && seconds === 0
            ? <h1>0:00</h1>
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        } */}
        <h2>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
        </h2>
        </div>
            </div>
          <div className="questions-center">
              {questions.map((item) => {
                  return <TestQuestion key={item._id} {...item}/>
              })}
          </div>
              <button onClick={handleStop} type="submit"><Link to={{
              pathname: '/dashboard',
              state: {
                  time: "5:05",
                  difficulty: difficulty,
                  subject: subject,
              }}}> Finish Test
              </Link>
              </button>
        </section>
        <Stopwatch time={time}/>
        </>
    )
}

export default Test

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }
  
  // https://stackoverflow.com/a/2998874/1673761
  const twoDigits = (num) => String(num).padStart(2, '0')
  