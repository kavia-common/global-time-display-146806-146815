import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Global Time title', () => {
  render(<App />);
  expect(screen.getByText(/Global Time/i)).toBeInTheDocument();
});
