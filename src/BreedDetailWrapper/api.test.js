import { fetchBreedDetails } from "./api";
import { breedDetails } from "../setupTests";

const mockFetchUserData = (data) => {
  return global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => data
    })
  );
}

test("test successful addFavourite response", async () => {
  mockFetchUserData(breedDetails);
  const { json } = await fetchBreedDetails({ breed_id: "beng", limit: breedDetails.length });
  expect(json.length).toBe(breedDetails.length);
  expect(fetch).toHaveBeenCalledTimes(1);
});
