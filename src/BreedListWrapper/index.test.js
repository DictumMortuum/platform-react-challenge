import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BreedListWrapper from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { breeds } from '../setupTests';
import { act } from 'react-dom/test-utils';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/breeds`, (req, res, ctx) => {
    return res(ctx.json(breeds));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render the BreedListWrapper and test the Pagination', async () => {
  render(
    <BrowserRouter>
      <BreedListWrapper perPage={2} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const element = screen.getByText(/Sphynx/);
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  });

  const nextIcon = screen.getByTestId("NavigateNextIcon");
  act(() => {
    fireEvent.click(nextIcon);
  });

  await waitFor(() => {
    const element = screen.getByText(/Toyger/);
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  });

  const prevIcon = screen.getByTestId("NavigateBeforeIcon");
  act(() => {
    fireEvent.click(prevIcon);
  });

  await waitFor(() => {
    const element = screen.getByText(/Sphynx/);
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  });
});
