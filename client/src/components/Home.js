import React from 'react'
import About from './About'
import { Paper, Box} from '@material-ui/core'

const Home = () => {

  return (
    <>
    <br/>
      <Paper 
        style={{
            padding: '20px',
            margin: '20px auto',
            maxWidth: '960px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
        }}>
      <h2>Welcome to Stocks</h2>
      <p>Welcome to our stock trading education platform! We provide an easy and accessible way to learn about the stock market. Start with our $10,000 virtual cash to practice your strategies. Please note, our website is for educational purposes only, not financial advice. Have a productive and enjoyable experience! Feel free to reach out to us with any questions.</p>
    </Paper>
    </>
  )
}

export default Home