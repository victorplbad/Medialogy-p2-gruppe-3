import { useState } from 'react';
import './App.css';

function App() {
  

  
  const [height, setHeight] = useState(0); // starting range

  

  // This function is called when the second range slider changes
  const changeHeight = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div className='container'>
      <h2>well-come to bungo</h2>

      {/* A range slider with default appearance */}
     

      {/* Custom range slider */}
      <h4>Grey scale: {height}px</h4> {/* name of slider */}
      <input
        type='range'
        onChange={changeHeight} // the value we change thats stores the current nr 
        min={0} // min range
        max={100} // max range
        step={1} // how much change pr "slide"
        value={height}
        className='custom-slider'
      ></input>

      
    </div>
  );
}

export default App;