import React from 'react';

function TitleInput({ inputValue, setInputValue, handleSubmit }) {
  return (
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
  );
}

export default TitleInput;