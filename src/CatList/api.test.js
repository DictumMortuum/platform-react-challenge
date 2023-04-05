import { fetchImages } from "./api";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("returns a json array on success", async () => {
  const data = [1,2,3,4];
  mockFetchUserData(data);
  const { json } = await fetchImages({ limit: 10, page: 0 });
  expect(json.length).toBe(4);
  expect(fetch).toHaveBeenCalledTimes(1);
});
