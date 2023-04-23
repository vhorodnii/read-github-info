import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  
  const input = screen.getByLabelText(/enter github login/i);
  expect(input).toBeInTheDocument();
  // expect(linkElement).toBeInTheDocument();
});
