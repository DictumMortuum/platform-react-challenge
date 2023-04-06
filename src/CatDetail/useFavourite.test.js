import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useFavourite } from './useFavourite';
import { act } from 'react-dom/test-utils';

const server = setupServer(
  rest.post(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, (req, res, ctx) => {
    return res(ctx.json({ "message":"SUCCESS", "id":101318813 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should favourite an image", async () => {
  const { result } = renderHook(() => useFavourite());
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBe(null);
  expect(result.current.rs).toEqual({});

  act(() => {
    result.current.setFavourite({ image_id: 1, sub_id: 2 });
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBe(null);
    expect(result.current.rs).toEqual({ "message":"SUCCESS", "id":101318813 });
  });

  act(() => {
    result.current.setFavourite({ image_id: 2, sub_id: 2 });
    result.current.setFavourite({ image_id: 2, sub_id: 2 });
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => {
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBe(null);
    expect(result.current.rs).toEqual({ "message":"SUCCESS", "id":101318813 });
  });
});
