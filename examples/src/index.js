import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SlidingPanel from 'react-sliding-side-panel';
import '../src/example.css';

const App = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState('left');
  return (
    <div className='example-container'>
      <div className='form-container'>
        <button
          onClick={() => {
            setPanelType('left');
            setOpenPanel(true);
          }}
        >
          Left
        </button>
        <button
          onClick={() => {
            setPanelType('right');
            setOpenPanel(true);
          }}
        >
          Right
        </button>
        <button
          onClick={() => {
            setPanelType('top');
            setOpenPanel(true);
          }}
        >
          Top
        </button>
        <button
          onClick={() => {
            setPanelType('bottom');
            setOpenPanel(true);
          }}
        >
          Bottom
        </button>
      </div>
      <SlidingPanel
        type={panelType}
        isOpen={openPanel}
        onClose={() => setOpenPanel(false)}
        size={66}
      >
        <div className='panel-container'>
          <div>My Panel Content</div>
          <button className='close-button' onClick={() => setOpenPanel(false)}>
            close
          </button>
        </div>
      </SlidingPanel>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();
