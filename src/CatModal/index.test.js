import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CatModal from '.';
import { json } from '../setupTests';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

const server = setupServer(
  rest.post(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json({ "message":"SUCCESS", "id":101318813 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    state: {
      "id": "ji-5E0VwY",
      "url": "https://cdn2.thecatapi.com/images/ji-5E0VwY.jpg",
      "breeds": [{
        "name": "American Curl",
        "description": "Distinguished by truly unique ears that curl back in a graceful arc, offering an alert, perky, happily surprised expression, they cause people to break out into a big smile when viewing their first Curl. Curls are very people-oriented, faithful, affectionate soulmates, adjusting remarkably fast to other pets, children, and new situations.",
      }]
    }
  }),
}));

test('render the CatDetail', async () => {
  const [ data ] = json;
  const { breeds } = data;

  render(
    <BrowserRouter>
      <CatModal />
    </BrowserRouter>
  );

  const header = screen.getByTestId("header");
  expect(header).toBeVisible();
  expect(header).toHaveTextContent(breeds[0].name);
  const content = screen.getByTestId("content");
  expect(content).toBeVisible();
  expect(content).toHaveTextContent(breeds[0].description);
  const button = screen.getByTestId("button");

  act(() => {
    fireEvent.click(button);
  });

  expect(button).toBeDisabled();
  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });
});
