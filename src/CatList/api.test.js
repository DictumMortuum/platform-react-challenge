import { fetchDetails, fetchImages } from "./api";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful fetchImages response", async () => {
  mockFetchUserData([1,2,3,4]);
  const { json } = await fetchImages({ limit: 10, page: 0 });
  expect(json.length).toBe(4);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("test successful fetchDetails response", async () => {
  mockFetchUserData({});
  const { json } = await fetchDetails({ id: 5 });
  expect(json).toEqual({});
  expect(fetch).toHaveBeenCalledTimes(1);
});
