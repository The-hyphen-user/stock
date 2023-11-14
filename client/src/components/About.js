import React, { useState, useEffect } from 'react'
import { Paper, Box} from '@material-ui/core'

const About = () => {
  return (
    <>
    <br/>
      <Paper 
        style={{
            padding: '20px',
            margin: '20px auto',
            maxWidth: '65%',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
        }}>
      <h2>Welcome to Porfolio Playground</h2>
      <p>Welcome to our playground, here you can try your luck and learn about the stock market in a risk free and fun environment.

Built using the latest technologies such as React Express, SQL, external stock market API’s from finnhub, and passport authentication, our website is designed to provide a seamless and intuitive experience for our users. The project is set up in a container configuration so it is easy for anyone to install and set up on their own.

Our mission is to empower individuals by providing the tools and resources they need to understand the stock market and make confident investment decisions. Whether you're a seasoned trader or just starting out, our website is the perfect place to stay informed and make the most of your money.

If you have any questions or feedback, please do not hesitate to contact me at daniel.wamsher@gmail.com.

Thank you for choosing our portfolio playground, I hope you enjoy using it and find it helpful in your journey to learn about the stock market.
</p>
    </Paper>



    </>
  )
}
//  daniel.wamsher@gmail.com <a href="mailto:daniel.wamsher@gmail.com"><button>Email</button></a>
export default About

//<h4>Issues</h4>
//<p>if you encounter any issue or suggestions please email me</p>


/**
 * 
 * 

      <div>
        <h4>things to know</h4>
        <p>
        the goal of this site is to enable people to practice stock trading with virtual money.
          there will be random users generated to compete against on the high scores. there names will start with -bot-
          <br></br>
          for example -bot-dan  or -bot-joe
          <br />
          when created they will buy stocks at random and then halt all trading.

        </p>
      </div>
      <div>
        <h4>how to play</h4>
        <p>
          you will be given $10,000 to start with. Your balance is the combined value of all your stocks and balance.
          <br/>
          Try to see how much money you are able to obtain.
        </p>
        <br />
      </div>
      <div>
      </div>
 * 
 */
