import React, { FC, useState } from 'react';
import SlidingPanel, { SliderPanelProps } from '../SlidingPanel';
import styles from './SlidingPanel.module.css';

const Example: FC<SliderPanelProps> = ({ type, size, noBackdrop, isOpen }) => {
  const [openPanel, setOpenPanel] = useState<boolean>(false);

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.formContainer}>
        <h1>React Sliding Side Panel</h1>
        <div className={styles.inputContainer}>
          <button type="button" onClick={() => setOpenPanel(true)}>
            Open Panel
          </button>
        </div>
      </div>
      <SlidingPanel
        type={type}
        isOpen={openPanel || isOpen}
        backdropClicked={() => setOpenPanel(false)}
        size={size}
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

export default Example;
