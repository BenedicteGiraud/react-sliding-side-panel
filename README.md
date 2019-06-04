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
        <button
          onClick={() => {
            setOpenPanel(true);
          }}
        >
          Left
        </button>
      </div>
      <SlidingPanel
        type={'left'}
        isOpen={openPanel}
        onClose={() => setOpenPanel(false)}
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
- `onClose` - function to provide to the panel to allow it to close itself
