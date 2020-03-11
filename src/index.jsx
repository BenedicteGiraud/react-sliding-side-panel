import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './index.css';

const getPanelGlassStyle = (type, size, hidden) => {
  const horizontal = type === 'bottom' || type === 'top';
  return {
    width: horizontal ? `${hidden ? '0' : '100'}vw` : `${100 - size}vw`,
    height: horizontal ? `${100 - size}vh` : `${hidden ? '0' : '100'}vh`,
    ...(type === 'right' && { left: 0 }),
    ...(type === 'top' && { bottom: 0 }),
    position: 'inherit',
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
    overflow: 'auto',
  };
};

const SlidingPanel = ({
  type,
  size,
  panelContainerClassName,
  panelClassName,
  isOpen,
  onOpen,
  onOpening,
  onOpened,
  onClose,
  onClosing,
  onClosed,
  backdropClicked,
  noBackdrop,
  children,
}) => {
  const glassBefore = type === 'right' || type === 'bottom';
  const horizontal = type === 'bottom' || type === 'top';
  return (
    <div>
      <div className={`sliding-panel-container ${isOpen ? 'active' : ''} ${noBackdrop ? 'click-through' : ''}`}>
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames={`panel-container-${type}`}
          unmountOnExit
          onEnter={(node, isAppearing) => onOpen(node, isAppearing)}
          onEntering={(node, isAppearing) => onOpening(node, isAppearing)}
          onEntered={(node, isAppearing) => onOpened(node, isAppearing)}
          onExit={node => onClose(node)}
          onExiting={node => onClosing(node)}
          onExited={node => onClosed(node)}
          style={{ display: horizontal ? 'block' : 'flex' }}
        >
          <div>
            {glassBefore && (
              <div
                className="glass"
                style={getPanelGlassStyle(type, size, noBackdrop)}
                onClick={(e) => { if (!noBackdrop) backdropClicked(e); }}
              />
            )}
            <div className={`panel ${panelContainerClassName || ''}`} style={getPanelStyle(type, size)}>
              <div className={`panel-content ${panelClassName || ''}`}>{children}</div>
            </div>
            {!glassBefore && (
              <div
                className="glass"
                style={getPanelGlassStyle(type, size, noBackdrop)}
                onClick={(e) => { if (!noBackdrop) backdropClicked(e); }}
              />
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

SlidingPanel.propTypes = {
  type: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  size: PropTypes.number,
  panelClassName: PropTypes.string,
  panelContainerClassName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onOpening: PropTypes.func,
  onOpened: PropTypes.func,
  onClose: PropTypes.func,
  onClosing: PropTypes.func,
  onClosed: PropTypes.func,
  backdropClicked: PropTypes.func,
  noBackdrop: PropTypes.bool,
  children: PropTypes.element,
};

SlidingPanel.defaultProps = {
  type: 'left',
  size: 50,
  panelClassName: '',
  panelContainerClassName: '',
  onOpen: () => null,
  onOpening: () => null,
  onOpened: () => null,
  onClose: () => null,
  onClosing: () => null,
  onClosed: () => null,
  backdropClicked: () => null,
  noBackdrop: false,
  children: null,
};

export default SlidingPanel;
