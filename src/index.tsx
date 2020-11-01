import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

export type PanelType = 'top' | 'right' | 'bottom' | 'left';

type Nullable<T> = T | null;
export interface SliderProps {
  type: PanelType;
  size: number;
  panelContainerClassName?: string;
  panelClassName?: string;
  isOpen: boolean;
  children: Nullable<React.ReactElement>;
  noBackdrop?: boolean;
  backdropClicked?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onOpen?: (node: HTMLElement, isAppearing: boolean) => void;
  onOpening?: (node: HTMLElement, isAppearing: boolean) => void;
  onOpened?: (node: HTMLElement, isAppearing: boolean) => void;
  onClose?: (node: HTMLElement) => void;
  onClosing?: (node: HTMLElement) => void;
  onClosed?: (node: HTMLElement) => void;
}

type PanelGlassStyle = {
  width: string;
  height: string;
  left?: number;
  right?: number;
  bottom?: number;
  overflow?: string;
  position:
    | 'inherit'
    | '-moz-initial'
    | 'initial'
    | 'revert'
    | 'unset'
    | '-webkit-sticky'
    | 'absolute'
    | 'fixed'
    | 'relative'
    | 'static'
    | 'sticky'
    | undefined;
};

const getPanelGlassStyle = (type: PanelType, size: number, hidden: boolean): PanelGlassStyle => {
  const horizontal = type === 'bottom' || type === 'top';
  return {
    width: horizontal ? `${hidden ? '0' : '100'}vw` : `${100 - size}vw`,
    height: horizontal ? `${100 - size}vh` : `${hidden ? '0' : '100'}vh`,
    ...(type === 'right' && { left: 0 }),
    ...(type === 'top' && { bottom: 0 }),
    position: 'inherit',
  };
};

const getPanelStyle = (type: PanelType, size: number): PanelGlassStyle => {
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

const SlidingPanel: React.FunctionComponent<SliderProps> = ({
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
          onEnter={onOpen}
          onEntering={onOpening}
          onEntered={onOpened}
          onExit={onClose}
          onExiting={onClosing}
          onExited={onClosed}
          style={{ display: horizontal ? 'block' : 'flex' }}
        >
          <div>
            {glassBefore && (
              <div
                className="glass"
                style={getPanelGlassStyle(type, size, !!noBackdrop)}
                onClick={(e) => {
                  if (!noBackdrop && backdropClicked) backdropClicked(e);
                }}
              />
            )}
            <div className={`panel ${panelContainerClassName || ''}`} style={getPanelStyle(type, size)}>
              <div className={`panel-content ${panelClassName || ''}`}>{children}</div>
            </div>
            {!glassBefore && (
              <div
                className="glass"
                style={getPanelGlassStyle(type, size, !!noBackdrop)}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  if (!noBackdrop && backdropClicked) backdropClicked(e);
                }}
              />
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

SlidingPanel.defaultProps = {
  type: 'left',
  size: 50,
  panelClassName: '',
  panelContainerClassName: '',
  noBackdrop: false,
  children: null,
};

export default SlidingPanel;
