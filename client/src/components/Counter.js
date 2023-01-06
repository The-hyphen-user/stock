import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, setValue } from '../features/slices/counterSlice'

const Counter = () => {
  const [newvalue, setNewvalue] = useState(0)
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
    <section>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
      <input onChange={(e) => setNewvalue(e.target.value)} />
      <button onClick={() => dispatch(setValue(newvalue))}>Set Value</button>

    </section>





    </div>
  )
}

export default Counter