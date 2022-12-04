import React, {useState} from 'react'
import axios from 'axios'

const TestDB = () => {
  const [response, setResponse] = useState('nothing yet')

  const serverURL = 'http://localhost:5000'

  const handleClick = () => {
    axios.get(`${serverURL}/api/db`)
    .then(res => {
      console.log(res.data)
      setResponse(res.data)
    })
  }
    
  return (
    <div>
      <button onClick={handleClick}>get responce</button>

      <p>{response}</p>

    </div>
  )
}

export default TestDB