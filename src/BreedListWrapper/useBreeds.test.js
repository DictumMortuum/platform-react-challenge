import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useBreeds } from './useBreeds';
import { breeds } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/breeds`, (req, res, ctx) => {
    return res(ctx.json(breeds));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch breeds", async () => {
  const perPage = 2;
  const { result } = renderHook(() => useBreeds({ perPage }));
  expect(result.current.page).toBe(1);
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.breeds.length).toBe(0);
  expect(result.current.count).toBe(0);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.changePage(2);
  });

  await waitFor(() => {
    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.breeds.length).toBe(breeds.length);
    expect(result.current.current_breeds.length).toBe(perPage);
    expect(result.current.count).toBe(breeds.length / perPage);
    expect(result.current.error).toBe(null);
  });

  act(() => {
    result.current.changePage(3);
  });

  await waitFor(() => {
    expect(result.current.page).toBe(3);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.breeds.length).toBe(breeds.length);
    expect(result.current.current_breeds.length).toBe(perPage);
    expect(result.current.count).toBe(breeds.length / perPage);
    expect(result.current.error).toBe(null);
  });

  act(() => {
    result.current.changePage(2);
  });

  await waitFor(() => {
    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.breeds.length).toBe(breeds.length);
    expect(result.current.current_breeds.length).toBe(perPage);
    expect(result.current.count).toBe(breeds.length / perPage);
    expect(result.current.error).toBe(null);
  });
});
