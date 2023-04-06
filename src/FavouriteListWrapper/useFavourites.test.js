import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useFavourites } from './useFavourites';
import { favourites } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json(favourites));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch favourites", async () => {
  const { result } = renderHook(() => useFavourites({ sub_id: process.env.REACT_APP_SUB_ID, limit: 10 }));
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.items.length).toBe(0);
  expect(result.current.error).toBe(null);

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(10);
    expect(result.current.error).toBe(null);
  });

  act(() => {
    result.current.refetch();
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(10);
    expect(result.current.error).toBe(null);
  });
});
