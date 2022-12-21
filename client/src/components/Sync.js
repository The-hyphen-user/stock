import React, { useState } from 'react'
import axios from 'axios';

const Sync = () => {

  const [syncStatus, setSyncStatus] = useState("default")

  const handleSubmit = () => {
    console.log("syncing")
    axios.post('/sync')
    .then((res) => {
      console.log(res.data)
      setSyncStatus(res.data)
      })
  }
  return (
    <div>
    <button onClick={handleSubmit}>sync</button>
    <p>{syncStatus}</p>

    </div>
  )
}

export default Sync