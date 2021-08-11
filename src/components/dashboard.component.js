import React from 'react'

import {useLocation} from 'react-router-dom'

const Dashboard = (props) => {
    const location = useLocation()
    const {time, difficulty, subject} = location.state
    return (
        <div>
            <h1>
                Summary
            </h1>
            <h2>Time taken: {time}</h2>
            <h2>Difficulty: {difficulty} </h2>
            <h2>Subject: {subject}</h2>
        </div>
    )
}

export default Dashboard
