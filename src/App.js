import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js'
import logo from './logo.svg';
import './App.css';
import TitleInput from './components/TitleInput'; 
import PeakVisibility from './components/PeakVisibility';
import WidthSlider from './components/WidthSlider';
import Footer from './components/Footer';

function App() {
  const [plot, setPlot] = useState({});
  const [showStemTraces, setShowStemTraces] = useState(true); // new state for checkbox
  const [title, setTitle] = useState('Raman Spectrum'); 
  const [inputValue, setInputValue] = useState(''); 
  const [sliderValue, setSliderValue] = useState(20);

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

        <TitleInput inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} />

        <PeakVisibility showStemTraces={showStemTraces} setShowStemTraces={setShowStemTraces} />

        <WidthSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />

      </header>
      <Footer />
    </div>
  );
}

export default App;
