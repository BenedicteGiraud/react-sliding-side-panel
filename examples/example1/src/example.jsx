import React, { useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import './example.css';

const App = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState('left');
  const [panelSize, setPanelSize] = useState(30);
  return (
    <div className="example-container">
      <div className="form-container">
        <div>
          <label htmlFor="width_input">
            width (in %)
            <input
              name="width_input"
              type="number"
              value={panelSize}
              onChange={({ target }) => setPanelSize(target.value)}
            />
          </label>
        </div>
        <div>
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
        noBackdrop
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
