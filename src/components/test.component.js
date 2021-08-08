import React, {useState, useCallback, useEffect} from 'react'
import Loading from './loading.component'
import axios from 'axios'
import TestQuestion from './test-list.component'
import {useLocation} from 'react-router-dom'

const Test = (props) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const {/* subject, */ time, difficulty} = location.state
    const [questions, setQuestions] = useState([]);
    const {initialMinute = time,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);

    const url = "http://localhost:5000/questions/"

    const getQuestions = useCallback(async () => {
        axios
  .get(`${url}${difficulty}`)
  .then(response => {
      if (response.data.length > 0) {
          setQuestions(response.data.map(question => question))
      }
  })
  .catch(function (error) {
    console.log(error);
 });
}, [difficulty]);

    

      useEffect(() => {
        getQuestions()
        setLoading(false)
    }, [difficulty, getQuestions])

    useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                        window.location = '/time-up';
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });


    if (loading) {
        return <Loading/>
     }

    return (
        <>
        <section className="section">
            <div className="upper-area-test">
            <h2 className="section-title">Questions</h2>
            <div className="section-timer">{ minutes === 0 && seconds === 0
            ? <h1>0:00</h1>
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }</div>
            </div>
          <div className="questions-center">
              {questions.map((item) => {
                  return <TestQuestion key={item._id} {...item}/>
              })}
          </div>
          
        </section>
        </>
    )
}

export default Test
