import * as React from 'react';
import './index.css';
export declare type PanelType = 'top' | 'right' | 'bottom' | 'left';
declare type Nullable<T> = T | null;
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
declare const SlidingPanel: React.FunctionComponent<SliderProps>;
export default SlidingPanel;
