import { fetchDetails } from "./api";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful fetchDetails response", async () => {
  mockFetchUserData({});
  const { json } = await fetchDetails({ id: 5 });
  expect(json).toEqual({});
  expect(fetch).toHaveBeenCalledTimes(1);
});
