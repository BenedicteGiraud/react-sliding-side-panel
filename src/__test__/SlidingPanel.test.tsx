import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SlidingPanel from '../SlidingPanel';

describe('SlidingPanel component', () => {
  const TestingComponent = () => {
    const [openPanel, setOpenPanel] = React.useState<boolean>(false);
    return (
      <>
        <h1>Testing Component</h1>
        <button type="button" onClick={() => setOpenPanel(true)}>
          Open Panel
        </button>
        <SlidingPanel
          type="left"
          isOpen={openPanel}
          size={30}
          noBackdrop={false}
          backdropClicked={() => setOpenPanel(false)}
        >
          <div className="panel-container">
            <div>My Panel Content</div>
            <button type="button" className="close-button" onClick={() => setOpenPanel(false)}>
              Close Panel
            </button>
          </div>
        </SlidingPanel>
      </>
    );
  };

  it('SlidingPanel should render correctly', async () => {
    render(<TestingComponent />);
    const openButton = screen.getByRole('button', { name: 'Open Panel' });
    expect(openButton).toBeVisible();
    expect(screen.queryByText('My Panel Content')).not.toBeInTheDocument();
    await userEvent.click(openButton);
    expect(screen.getByText('My Panel Content')).toBeVisible();
    const closeButton = screen.getByRole('button', { name: 'Close Panel' });
    expect(closeButton).toBeVisible();
    await userEvent.click(closeButton);
    // wait for the panel to close
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(screen.queryByText('My Panel Content')).not.toBeInTheDocument();
  });
});
