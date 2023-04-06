import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import FavouriteListWrapper from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { favourites } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json(favourites));
  }),
  rest.delete(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render the FavouriteListWrapper', async () => {
  render(
    <MemoryRouter>
      <FavouriteListWrapper />
    </MemoryRouter>
  );

  await waitFor(() => {
    const images = screen.getAllByTestId("favouriteimage");
    expect(images.length).toBe(10);
  });

  const buttons = screen.getAllByTestId("button-unfavourite");
  act(() => {
    fireEvent.click(buttons[0]);
  });
});
