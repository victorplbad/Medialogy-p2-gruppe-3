import { useState } from 'react';
import './giga.css';

function PageSettings() {
  


  const [height, setHeight] = useState(0); // starting range

  

  // This function is called when the second range slider changes
  const changeHeight = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div className='SettingsPage'>

    <div style={styles.container}> {/* needed for style baground */} 
      
      {/* Custom range slider */}
      <h4>Grey scale: {height}%</h4> {/* name of slider */}
      
      <input
        type='range'
        onChange={changeHeight} // the value we change thats stores the current nr 
        min={0} // min range
        max={100} // max range
        step={1} // how much change pr "slide"
        value={height}
        className='custom-slider'
      ></input>

      <p className="text-4xl font-bold mb-4 text-white">
        thisTestMail@mail.com
      </p>

      <p className="text-4xl font-bold mb-4 text-white">
        password : ****
      </p>

      <p className="text-4xl font-bold mb-4 text-white">
        
                  <button className="button buttonGreen">logout</button>

      </p>

      <p className="text-4xl font-bold mb-4 text-white">
        (hiden)
        thisTestMail@mail.com <button className="button buttonRed">logout</button>
      </p>
    </div>
    </div> // needed for style baground
  );
}


const styles = {
    container: {
    backgroundColor: "#8C8C8C",
  },
} as const;

export default PageSettings;

