import { fetchImages } from "./api";

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
