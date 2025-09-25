import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sidebar navigation items', () => {
  render(<App />);
  expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  expect(screen.getByText(/Experience/i)).toBeInTheDocument();
  expect(screen.getByText(/Achievements/i)).toBeInTheDocument();
});
