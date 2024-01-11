import React from 'react';

function PeakVisibility({ showStemTraces, setShowStemTraces }) {
  return (
    <div>
      <label htmlFor="peak-visibility" style={{fontSize: '14px'}}>Show Peaks </label>
      <input
        id="peak-visibility"
        type="checkbox"
        checked={showStemTraces}
        onChange={(event) => setShowStemTraces(event.target.checked)}
      />
    </div>
  );
}

export default PeakVisibility;