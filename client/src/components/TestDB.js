import React, {useState} from 'react'
import axios from 'axios'

const TestDB = () => {
  const [response, setResponse] = useState('nothing yet')

  const serverURL = 'http://localhost:6868'

  const handleClick = () => {
    axios.get(`${serverURL}/a`)
    .then(res => {
      console.log(res.data)
      setResponse(res.data)
    })
  }
    
  return (
    <div>
      <button onClick={handleClick}>synce</button>

      <p>{response}</p>

    </div>
  )
}

export default TestDB