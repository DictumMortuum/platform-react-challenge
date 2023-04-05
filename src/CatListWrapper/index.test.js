import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CatList from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { json } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/search`, (req, res, ctx) => {
    return res(ctx.json(json));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render the CatList and test the LoadMore button', async () => {
  render(
    <BrowserRouter>
      <CatList limit={10} />
    </BrowserRouter>
  );

  await waitFor(() => {
    const images = screen.getAllByTestId("catimage");
    images.map(d => {
      expect(d).toBeVisible();
    });
    expect(images.length).toBe(2);
  });

  const button = screen.getByTestId("morecat");
  expect(button).toHaveTextContent("Load More");
  fireEvent.click(button);

  await waitFor(() => {
    const images = screen.getAllByTestId("catimage");
    images.map(d => {
      expect(d).toBeVisible();
    });

    // these should be filtered down to two, because they're duplicates
    expect(images.length).toBe(2);
  });
});
