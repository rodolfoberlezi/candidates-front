import { render, screen } from '@testing-library/react'

import '../tests/matchMedia.mock'
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/A plataforma ideal para encontrar seu candidato/i);
  expect(linkElement).toBeInTheDocument();
});
