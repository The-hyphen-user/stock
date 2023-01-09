import React, { useState } from 'react'
import axios from 'axios';

const Sync = () => {

  const [syncStatus, setSyncStatus] = useState("default")
  const [syncStatus2, setSyncStatus2] = useState("default")

  const handleSubmit = () => {
    console.log("syncing")
    axios.post('/sync')
    .then((res) => {
      console.log(res.data)
      setSyncStatus(res.data)
      })
  }
  const handleSubmit2 = () => {
    console.log("syncing")
    axios.post('/sync2')
    .then((res) => {
      console.log(res.data)
      setSyncStatus2(res.data)
      })
    }
  return (
    <div>
    <button onClick={handleSubmit}>sync</button>
    <p>{syncStatus}</p>
    <br/>
    <button onClick={handleSubmit2}>sync2</button>
    <p>{syncStatus2}</p>



    </div>
  )
}

export default Sync