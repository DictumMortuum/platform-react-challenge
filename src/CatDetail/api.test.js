import { addFavourite } from "./api";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful addFavourite response", async () => {
  mockFetchUserData({ "message":"SUCCESS", "id":101318813 });
  const { json } = await addFavourite({ image_id: 5, sub_id: 2 });
  expect(json).toEqual({ "message":"SUCCESS", "id":101318813 });
  expect(fetch).toHaveBeenCalledTimes(1);
});
