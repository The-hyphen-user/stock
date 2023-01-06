import React, { useState, useEffect } from 'react'
import { TextField, Grid, Card, Paper, Button, Box } from '@material-ui/core';

const Stock = ({ symbol, amount, price, name, id, selectable, select, tradable, buy, sell }) => {
  const [tradeQuantity, setTradeQuantity] = useState(0)
  const handleSelect = () => {
    console.log('selected')
    select({ symbol, amount, price, name, id })
  }
  const handleBuy = () => {
    console.log('buy!, symbol:', symbol, 'amount:', tradeQuantity)
    buy({ symbol, tradeQuantity})
  }
  const handleSell = () => {
    console.log('sell')
    sell({ symbol, tradeQuantity})
  }
  return (
    <Box>
    <Paper elevation={3}
      >
      <Grid container spacing={4} elevation='4'
      >

        <Grid item xs={2} variant='contained'>
            {symbol ? <div>{symbol}</div> : <div></div>}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
            {amount ? <div>{amount}</div> : <div></div>}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
            {price ? <div>${price}</div> : <div></div>}
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
            {name ? <div>{name}</div> : <div></div>}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
            {id ? <div>{id}</div> : <div></div>}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
            <div>
              {selectable ?
                <Button color='primary' variant='contained' onClick={handleSelect}>select</Button> : <div></div>}
            </div>
            <div>
              {tradable ?
                <div>
                <Grid
                  container
                  spacing={4}
                  direction={"row"}
                  sx={{
                    width: "60%",
                  }}
                >
                <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
                <TextField
                  id="outlined-number"
                  label="Quantity"
                  type="Number"
                  min="0"
                  step="1"
                  onInput="validity.valid||(value='');"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    setTradeQuantity(e.target.value)
                  }}
                />
                </Grid>
                
                <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
                <Button color='primary' variant='contained' onClick={handleBuy}>buy</Button>
                <Button color='primary' variant='contained' onClick={handleSell}>sell</Button>
                </Grid>
                </Grid>
                </div> : <div></div>}
            </div>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  )
}

export default Stock