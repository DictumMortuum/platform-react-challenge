import { render, screen } from '@testing-library/react';
import BreedList from '.';
import { BrowserRouter } from 'react-router-dom';
import { breeds } from '../setupTests';

test('renders the list with dummy data', () => {
  const data = breeds;
  render(
    <BrowserRouter>
      <BreedList data={data} />
    </BrowserRouter>
  );

  const cards = screen.getAllByTestId("breed");
  cards.map(d => {
    expect(d).toBeVisible();
  });
  expect(cards.length).toBe(breeds.length);
});
