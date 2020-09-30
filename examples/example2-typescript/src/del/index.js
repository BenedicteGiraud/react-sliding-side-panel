"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
require("./index.css");
const getPanelGlassStyle = (type, size, hidden) => {
    const horizontal = type === 'bottom' || type === 'top';
    return Object.assign(Object.assign(Object.assign({ width: horizontal ? `${hidden ? '0' : '100'}vw` : `${100 - size}vw`, height: horizontal ? `${100 - size}vh` : `${hidden ? '0' : '100'}vh` }, (type === 'right' && { left: 0 })), (type === 'top' && { bottom: 0 })), { position: 'inherit' });
};
const getPanelStyle = (type, size) => {
    const horizontal = type === 'bottom' || type === 'top';
    return Object.assign(Object.assign(Object.assign({ width: horizontal ? '100vw' : `${size}vw`, height: horizontal ? `${size}vh` : '100vh' }, (type === 'right' && { right: 0 })), (type === 'bottom' && { bottom: 0 })), { position: 'inherit', overflow: 'auto' });
};
const SlidingPanel = ({ type, size, panelContainerClassName, panelClassName, isOpen, onOpen, onOpening, onOpened, onClose, onClosing, onClosed, backdropClicked, noBackdrop, children }) => {
    const glassBefore = type === 'right' || type === 'bottom';
    const horizontal = type === 'bottom' || type === 'top';
    return (React.createElement("div", null,
        React.createElement("div", { className: `sliding-panel-container ${isOpen ? 'active' : ''} ${noBackdrop ? 'click-through' : ''}` },
            React.createElement(react_transition_group_1.CSSTransition, { in: isOpen, timeout: 500, classNames: `panel-container-${type}`, unmountOnExit: true, onEnter: onOpen, onEntering: onOpening, onEntered: onOpened, onExit: onClose, onExiting: onClosing, onExited: onClosed, style: { display: horizontal ? 'block' : 'flex' } },
                React.createElement("div", null,
                    glassBefore && (React.createElement("div", { className: "glass", style: getPanelGlassStyle(type, size, !!noBackdrop), onClick: (e) => {
                            if (!noBackdrop && backdropClicked)
                                backdropClicked(e);
                        } })),
                    React.createElement("div", { className: `panel ${panelContainerClassName || ''}`, style: getPanelStyle(type, size) },
                        React.createElement("div", { className: `panel-content ${panelClassName || ''}` }, children)),
                    !glassBefore && (React.createElement("div", { className: "glass", style: getPanelGlassStyle(type, size, !!noBackdrop), onClick: (e) => {
                            if (!noBackdrop && backdropClicked)
                                backdropClicked(e);
                        } })))))));
};
SlidingPanel.defaultProps = {
    type: 'left',
    size: 50,
    panelClassName: '',
    panelContainerClassName: '',
    noBackdrop: false,
    children: null,
};
exports.default = SlidingPanel;
