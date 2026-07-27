import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders planner heading', () => {
    render(<App />);
    expect(screen.getByText(/Miyawaki Forest Planner/i)).toBeInTheDocument();
  });

  it('applies a scenario preset and shows feedback', async () => {
    const user = userEvent.setup();
    render(<App />);

    const roadsideButtons = screen.getAllByRole('button', { name: /Roadside Strip/i });
    await user.click(roadsideButtons[0]);

    expect(screen.getByText(/Preset applied: Roadside Strip/i)).toBeInTheDocument();
  });

  it('renders scenario compare section', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { name: /Scenario Compare/i })[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Delta \(Current - Preset\)/i)[0]).toBeInTheDocument();
  });

  it('tracks checklist completion progress', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByText(/Completed 0 of/i)[0]).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(screen.getAllByText(/Completed 1 of/i)[0]).toBeInTheDocument();
  });
});
