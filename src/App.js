import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js'
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  const [plot1, setPlot1] = useState({});
  useEffect(() => {
    fetch('http://localhost:5000/plot1').then(res => res.json()).then(data => {
      setPlot1(data);
    });
  }, []);

  const [plot2, setPlot2] = useState({});
  useEffect(() => {
    fetch('http://localhost:5000/plot2').then(res => res.json()).then(data => {
      setPlot2(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
        {plot1.data && plot1.layout ? <Plot data={plot1.data} layout={plot1.layout}/> : null}
        {plot2.data && plot2.layout ? <Plot data={plot2.data} layout={plot2.layout}/> : null}
      </header>
    </div>
  );
}

export default App;
