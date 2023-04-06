import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useBreedDetails } from './useBreedDetails';
import { breedDetails } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/search`, (req, res, ctx) => {
    return res(ctx.json(breedDetails));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch breed details", async () => {
  const { result } = renderHook(() => useBreedDetails({ breed_id: "beng", limit: breedDetails.length }));
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.details).toEqual([]);
  expect(result.current.error).toBe(null);

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.details.length).toBe(breedDetails.length);
    expect(result.current.error).toBe(null);
  });
});
