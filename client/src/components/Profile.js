import React from 'react'
import {useSelector } from 'react-redux'
import Test from './Test'
import Holdings from './Holdings'

const Profile = () => {
  const balance = useSelector((state) => state.user.user.balance)
  return (
    <div>
      <h3>balance: {balance}</h3>
      <p>wouldnt it be cool if there were like graphs and charts here</p>
      <p>Holdings:</p>
      <Holdings/>
      <p>Watch List:</p>
    </div>
  )
}

export default Profile