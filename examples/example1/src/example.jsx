import React, { useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import './example.css';

const App = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState('left');
  const [panelSize, setPanelSize] = useState(30);
  const [noBackdrop, setNoBackdrop] = useState(false);

  return (
    <div className="example-container">
      <div className="form-container">
        <h1>React Sliding Side Panel</h1>
        <div className="input-container">
          <label htmlFor="width_input">
            width (in %)
            <input
              id="width_input"
              name="width_input"
              type="number"
              value={panelSize}
              onChange={({ target }) => setPanelSize(target.value)}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="no_backdrop">
            <input
              name="no_backdrop"
              id="no_backdrop"
              type="checkbox"
              checked={noBackdrop}
              onChange={({ target }) => setNoBackdrop(target.checked)}
            />
            Hide backdrop
          </label>
        </div>
        <div className="input-container">
          <button
            type="button"
            onClick={() => {
              setPanelType('left');
              setOpenPanel(true);
            }}
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => {
              setPanelType('right');
              setOpenPanel(true);
            }}
          >
            Right
          </button>
          <button
            type="button"
            onClick={() => {
              setPanelType('top');
              setOpenPanel(true);
            }}
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => {
              setPanelType('bottom');
              setOpenPanel(true);
            }}
          >
            Bottom
          </button>
        </div>
      </div>
      <SlidingPanel
        type={panelType}
        isOpen={openPanel}
        backdropClicked={() => setOpenPanel(false)}
        size={panelSize}
        panelClassName="additional-class"
        noBackdrop={noBackdrop}
      >
        <div className="panel-container">
          <div>My Panel Content</div>
          <button type="button" className="close-button" onClick={() => setOpenPanel(false)}>
            close
          </button>
        </div>
      </SlidingPanel>
    </div>
  );
};

export default App;
