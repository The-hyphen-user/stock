import React from 'react'
import {useSelector } from 'react-redux'
import Test from './Test'

const Profile = () => {
  const balance = useSelector((state) => state.user.user.balance)
  return (
    <div>
    <Test/>
      <h3>balance: {balance}</h3>
      <p>wouldnt it be cool if there were like graphs and charts here</p>
    </div>
  )
}

export default Profile