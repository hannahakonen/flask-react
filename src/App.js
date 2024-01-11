import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js'
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [plot, setPlot] = useState({});
  const [showStemTraces, setShowStemTraces] = useState(true); // new state for checkbox
  const [title, setTitle] = useState('Raman Spectrum'); 
  const [inputValue, setInputValue] = useState(''); 
  const [sliderValue, setSliderValue] = useState(20);

  /*
  useEffect(() => {
    fetch(`http://localhost:5000/plot?sliderValue=${sliderValue}`).then(res => res.json()).then(data => {
    // set visibility of plots based on checkbox
    data.data.forEach((plot) => {
      if (plot.name.startsWith('stemTrace')) {
        plot.visible = showStemTraces;
      }
    });  
    setPlot(data);
    });
  }, [showStemTraces, sliderValue]);
  */

  useEffect(() => {
    fetch(`http://localhost:5000/plot?sliderValue=${sliderValue}`).then(res => res.json()).then(data => {
      setPlot(data);
    });
  }, [sliderValue]);

  useEffect(() => {
    setPlot(prevPlot => {
      if (prevPlot.data) {
        const newPlotData = prevPlot.data.map((plot) => {
          if (plot.name.startsWith('stemTrace')) {
            return {...plot, visible: showStemTraces};
          }
          return plot;
        });
        return {...prevPlot, data: newPlotData};
      }
      return prevPlot;
    });
  }, [showStemTraces]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle(inputValue);
    setInputValue('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Raman Spectrum Simulator</p>

        {plot.data && plot.layout ? <Plot data={plot.data} layout={{...plot.layout, title: title}}/> : null}
  
        <form onSubmit={handleSubmit}>
        <label htmlFor="title-input" style={{fontSize: '14px'}}>Title </label>
          <input
            id="title-input"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">Change</button>
        </form>

        <label style={{fontSize: '14px'}}>
          Peaks
          <input
            type="checkbox"
            checked={showStemTraces}
            onChange={(e) => setShowStemTraces(e.target.checked)}
          />
        </label>

        <label style={{fontSize: '14px'}}>Width        
          <input
            type="range"
            min="1"
            max="70"
            step="1"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />
        </label>
        {sliderValue}
      </header>
      <Footer />
    </div>
  );
}

export default App;
