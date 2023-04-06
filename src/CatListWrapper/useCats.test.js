import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useCats } from './useCats';
import { json } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/search`, (req, res, ctx) => {
    return res(ctx.json(json));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch cats", async () => {
  const { result } = renderHook(() => useCats(10));
  expect(result.current.page).toBe(0);
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.items.length).toBe(0);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.loadMore();
  });

  await waitFor(() => {
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(2);
    expect(result.current.error).toBe(null);
  });

  act(() => {
    result.current.loadMore();
    result.current.loadMore();
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => {
    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(4);
    expect(result.current.error).toBe(null);
  });
});
