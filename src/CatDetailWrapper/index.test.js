import { render, screen, waitFor } from '@testing-library/react';
import CatDetailWrapper from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { json } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/${json[0].id}`, (req, res, ctx) => {
    return res(ctx.json(json[0]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: "ji-5E0VwY",
  }),
}));

test('render the CatDetailWrapper', async () => {
  const [ data ] = json;
  const { id, breeds } = data;

  render(
    <MemoryRouter initialEntries={[`/img/${id}`]}>
      <CatDetailWrapper />
    </MemoryRouter>
  );

  await waitFor(() => {
    const header = screen.getByTestId("header");
    expect(header).toBeVisible();
    expect(header).toHaveTextContent(breeds[0].name);
    const content = screen.getByTestId("content");
    expect(content).toBeVisible();
    expect(content).toHaveTextContent(breeds[0].description);
  });
});
