import { fetchFavourites } from "./api";
import { favourites } from "../setupTests";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful fetchFavourites response", async () => {
  mockFetchUserData(favourites);
  const { json } = await fetchFavourites({ sub_id: process.env.REACT_APP_SUB_ID });
  expect(json.length).toBe(10);
  expect(fetch).toHaveBeenCalledTimes(1);
});
