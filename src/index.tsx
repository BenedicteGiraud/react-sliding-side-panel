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

type GlassPanelStyle = {
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

const getGlassPanelStyle = (type: PanelType, size: number, hidden: boolean): GlassPanelStyle => {
  const isHorizontal = type === 'bottom' || type === 'top';
  return {
    width: isHorizontal ? `${hidden ? '0' : '100'}vw` : `${100 - size}vw`,
    height: isHorizontal ? `${100 - size}vh` : `${hidden ? '0' : '100'}vh`,
    ...(type === 'right' && { left: 0 }),
    ...(type === 'top' && { bottom: 0 }),
    position: 'inherit',
  };
};

const getPanelStyle = (type: PanelType, size: number): GlassPanelStyle => {
  const isHorizontal = type === 'bottom' || type === 'top';
  return {
    width: isHorizontal ? '100vw' : `${size}vw`,
    height: isHorizontal ? `${size}vh` : '100vh',
    ...(type === 'right' && { right: 0 }),
    ...(type === 'bottom' && { bottom: 0 }),
    position: 'inherit',
    overflow: 'auto',
  };
};

interface GlassPanelProps {
  type: PanelType;
  size: number;
  noBackdrop?: boolean;
  backdropClicked?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const GlassPanel = ({ type, size, noBackdrop, backdropClicked }: GlassPanelProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!noBackdrop && backdropClicked) {
      backdropClicked(e);
    }
  };
  return <div className="glass" style={getGlassPanelStyle(type, size, !!noBackdrop)} onClick={handleBackdropClick} />;
};

const SlidingPanel: React.FunctionComponent<SliderProps> = ({
  type = 'left',
  size = 50,
  panelContainerClassName = '',
  panelClassName = '',
  noBackdrop = false,
  children = null,
  isOpen,
  onOpen,
  onOpening,
  onOpened,
  onClose,
  onClosing,
  onClosed,
  backdropClicked,
}) => {
  const isHorizontal = type === 'bottom' || type === 'top';
  const glassBefore = type === 'right' || type === 'bottom';

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
          style={{ display: isHorizontal ? 'block' : 'flex' }}
        >
          <div>
            {glassBefore && (
              <GlassPanel noBackdrop={noBackdrop} backdropClicked={backdropClicked} type={type} size={size} />
            )}

            <div className={`panel ${panelContainerClassName || ''}`} style={getPanelStyle(type, size)}>
              <div className={`panel-content ${panelClassName || ''}`}>{children}</div>
            </div>

            {!glassBefore && (
              <GlassPanel noBackdrop={noBackdrop} backdropClicked={backdropClicked} type={type} size={size} />
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default SlidingPanel;
