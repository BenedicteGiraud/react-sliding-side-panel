# react-sliding-side-panel

# [Demo](https://benedictegiraud.github.io/react-sliding-side-panel/)

# Installation and usage

The easiest way to use react-sliding-side-panel is to install it from npm and build it into your app with Webpack.

```
npm install --save react-sliding-side-panel
```

Then use it in your app:

```js
import React, { useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';

const App = () => {
  const [openPanel, setOpenPanel] = useState(false);
  return (
    <div>
      <div>
        <button onClick={() => setOpenPanel(true)}>Open</button>
      </div>
      <SlidingPanel
        type={'left'}
        isOpen={openPanel}
        size={30}
      >
        <div>
          <div>My Panel Content</div>
          <button onClick={() => setOpenPanel(false)}>close</button>
        </div>
      </SlidingPanel>
    </div>
  );
};

export default App;
```

## Props

Common props you may want to specify include:

- `type` - left | right | top | bottom, specify the sliding panel position
- `size` - number between 0 and 100, specify the sliding panel size in percentage of the page size
- `isOpen` - boolean, open or close the sliding panel

This component uses [CSSTransition](http://reactcommunity.org/react-transition-group/css-transition) under the hood, so you can also specify the following props:

- `panelContainerClassName` - an optional additional classname for the panel container
- `panelClassName` - an optional additional classname for the panel content
- `noBackdrop` - an optional boolean to set to true if you don't want a backdrop panel
- `onOpen` - Similar to [onEnter](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEnter)
- `onOpening` - Similar to [onEntering](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEntering)
- `onOpened` - Similar to [onEntered](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onEntered)
- `onClose` - Similar to [onExit](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExit)
- `onClosing` - Similar to [onExiting](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExiting)
- `onClosed` - Similar to [onExited](http://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExited)
- `backdropClicked` - Callback called when the backdrop is clicked