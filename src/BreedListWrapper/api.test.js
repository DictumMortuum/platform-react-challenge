import { fetchBreeds } from "./api";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful fetchBreeds response", async () => {
  mockFetchUserData({});
  const { json } = await fetchBreeds();
  expect(json).toEqual({});
  expect(fetch).toHaveBeenCalledTimes(1);
});
