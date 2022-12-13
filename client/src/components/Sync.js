import React, { useState } from 'react'
import axios from 'axios';

const Sync = () => {

  const handleSubmit = () => {
    console.log("syncing")
    axios.post('/sync')
    .then((res) => {
      console.log(res.data)
      })
  }
  return (
    <div>
    <button onClick={handleSubmit}>sync</button>

    </div>
  )
}

export default Sync