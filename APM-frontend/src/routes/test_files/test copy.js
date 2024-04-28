
import React, {useState,useEffect} from 'react'

export default function Counter() {
  const [counter,setCounter]=useState(0);
  useEffect(() => {
    // Update the document title after every render
    document.title = `You clicked ${counter} times`;
  }, [counter]); // Only re-run the effect if count changes

  const handleChange=(action)=>{
    console.log(action);
    if(action=='increment'){
      setCounter(counter+1);
    }else{
      setCounter(counter-1);
    }
    console.log(counter);
  }
  return (
    <div>
      <button onClick={()=>handleChange('decrement')} data-testid="decrement-button">-</button>
      <button onClick={() => handleChange('increment')} data-testid="increment-button">+</button>
      <p>clicked: {counter}</p>
    </div>
  )
}

// run your code by clicking the run button on the right




