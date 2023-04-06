import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CatDetail from '.';
import { json } from '../setupTests';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json({ "message":"SUCCESS", "id":101318813 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render the CatDetail', async () => {
  const [ data ] = json;
  const { id, url, breeds } = data;

  render(
    <CatDetail id={id} url={url} breeds={breeds} />
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
    fireEvent.click(button);
  });

  expect(button).toBeDisabled();
  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });
});
