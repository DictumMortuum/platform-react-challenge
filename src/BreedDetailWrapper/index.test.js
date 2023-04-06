import { render, screen, waitFor } from '@testing-library/react';
import BreedDetailWrapper from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import { breedDetails } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/search`, (req, res, ctx) => {
    return res(ctx.json(breedDetails));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: "beng",
  }),
}));

test('render the BreedDetailWrapper', async () => {
  render(
    <MemoryRouter>
      <BreedDetailWrapper limit={10} />
    </MemoryRouter>
  );

  waitFor(() => {
    const images = screen.getAllByTestId("catimage");
    images.map(d => {
      expect(d).toBeVisible();
    });
    expect(images.length).toBe(2);
  });
});
