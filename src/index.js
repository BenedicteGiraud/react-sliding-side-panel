import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './sliding_panel.min.css';

const getPanelGlassStyle = (type, size) => {
  const horizontal = type === 'bottom' || type === 'top';
  return {
    width: horizontal ? '100vw' : `${100 - size}vw`,
    height: horizontal ? `${100 - size}vh` : '100vh',
    ...(type === 'right' && { left: 0 }),
    ...(type === 'top' && { bottom: 0 }),
    position: 'inherit'
  };
};

const getPanelStyle = (type, size) => {
  const horizontal = type === 'bottom' || type === 'top';
  return {
    width: horizontal ? '100vw' : `${size}vw`,
    height: horizontal ? `${size}vh` : '100vh',
    ...(type === 'right' && { right: 0 }),
    ...(type === 'bottom' && { bottom: 0 }),
    position: 'inherit',
    overflow: 'auto'
  };
};

const SlidingPanel = ({ type, size, isOpen, onClose, children }) => {
  const glassBefore = type === 'right' || type === 'bottom';
  const horizontal = type === 'bottom' || type === 'top';
  return (
    <div>
      <div className={isOpen ? 'sliding-panel-container' : ''}>
        <CSSTransition
          in={isOpen}
          timeout={1000}
          classNames={`panel-container-${type}`}
          unmountOnExit
          onExited={() => onClose()}
          style={{ display: horizontal ? 'block' : 'flex' }}
        >
          <div>
            {glassBefore && (
              <div
                className='glass'
                style={getPanelGlassStyle(type, size)}
                onClick={() => onClose()}
              />
            )}
            <div className='panel' style={getPanelStyle(type, size)}>
              <div className='panel-content'>{children}</div>
            </div>
            {!glassBefore && (
              <div
                className='glass'
                style={getPanelGlassStyle(type, size)}
                onClick={() => onClose()}
              />
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

SlidingPanel.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
};

SlidingPanel.defaultProps = {
  type: 'left',
  size: 50
};

export default SlidingPanel;
