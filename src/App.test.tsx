import { render, screen, within } from '@testing-library/react';
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

    const guidanceHeadings = screen.getAllByRole('heading', { name: /Year-1 Maintenance Guidance/i });
    const guidanceSection = guidanceHeadings[0]?.closest('section');

    expect(within(guidanceSection as HTMLElement).getByText(/Completed 0 of/i)).toBeInTheDocument();

    const checkboxes = within(guidanceSection as HTMLElement).getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(within(guidanceSection as HTMLElement).getByText(/Completed 1 of/i)).toBeInTheDocument();
  });
});
