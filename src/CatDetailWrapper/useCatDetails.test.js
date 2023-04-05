import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useCatDetails } from './useCatDetails';
import { json } from '../setupTests';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/ji-5E0VwY`, (req, res, ctx) => {
    return res(ctx.json(json[0]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch cat details", async () => {
  const { result } = renderHook(() => useCatDetails("ji-5E0VwY"));
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.details).toEqual({});
  expect(result.current.error).toBe(null);

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.details.id).toBe("ji-5E0VwY");
    expect(result.current.error).toBe(null);
  });
});
