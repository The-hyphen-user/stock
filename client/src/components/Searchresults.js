import React from 'react'
import Stock from './Stock'

const Searchresults = ({stock, stocks}) => {
  

  return (
    <div>
    {stock? (<div>
      <Stock 
        symbol={stock.symbol}
        price={stock.price}
        name={stock.name}
        selectable={true}
        select={stock.select}

      />
    </div>) :  (<div></div>)}
    {stocks? (<div></div>) :  (<div></div>)}

    </div>
  )
}

export default Searchresults