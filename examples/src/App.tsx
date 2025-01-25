import { useState } from 'react';
import SlidingPanel, { PanelType } from 'react-sliding-side-panel';
import styles from './App.module.css';
import 'react-sliding-side-panel/lib/index.css';

const App = () => {
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [panelType, setPanelType] = useState<PanelType>('left');
  const [panelSize, setPanelSize] = useState<number>(30);
  const [noBackdrop, setNoBackdrop] = useState<boolean>(false);
  
  const directions: PanelType[] = ['left', 'right', 'top', 'bottom'];

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.formContainer}>
        <h1>React Sliding Side Panel</h1>
        <div className={styles.inputContainer}>
          <label htmlFor="width_input">
            width (in %)
            <input
              id="width_input"
              name="width_input"
              type="range"
              max={100}
              min={0}
              value={panelSize}
              onChange={({ target }) => setPanelSize(Number(target.value))}
            />
            {panelSize}%
          </label>
        </div>
        <div className={styles.inputContainer}>
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
        <div className={styles.inputContainer}>
          {directions.map((type) => (
            <div key={type}>
              <input
                type="radio"
                id={type}
                name="direction"
                value={type}
                checked={panelType === type}
                onChange={() => setPanelType(type)} 
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <button type="button" onClick={() => setOpenPanel(true)}>
            Open Panel
          </button>
        </div>
      </div>
      <SlidingPanel
        type={panelType}
        isOpen={openPanel}
        backdropClicked={() => setOpenPanel(false)}
        size={panelSize}
        panelClassName=""
        panelContainerClassName=""
        noBackdrop={noBackdrop}
      >
        <div className={styles.panelContainer}>
          <div>My Panel Content</div>
          <button type="button" className={styles.closeButton} onClick={() => setOpenPanel(false)}>
            close
          </button>
        </div>
      </SlidingPanel>
    </div>
  );
};

export default App;
