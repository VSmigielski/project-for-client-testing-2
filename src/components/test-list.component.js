import React from 'react'

const TestQuestion = ({description}) => {
  return (
    <article className="question">
      <div className="question-footer">
        <h3>{description}</h3>
            <textarea  type="text"
                rows="5" 
                required
                className="form-control"
                />
      </div>
    </article>
  )
}

export default TestQuestion