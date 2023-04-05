import { renderHook, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useCats } from './useCats';

const json = [
  {"breeds":[{"weight":{"imperial":"5 - 10","metric":"2 - 5"},"id":"acur","name":"American Curl","cfa_url":"http://cfa.org/Breeds/BreedsAB/AmericanCurl.aspx","vetstreet_url":"http://www.vetstreet.com/cats/american-curl","vcahospitals_url":"https://vcahospitals.com/know-your-pet/cat-breeds/american-curl","temperament":"Affectionate, Curious, Intelligent, Interactive, Lively, Playful, Social","origin":"United States","country_codes":"US","country_code":"US","description":"Distinguished by truly unique ears that curl back in a graceful arc, offering an alert, perky, happily surprised expression, they cause people to break out into a big smile when viewing their first Curl. Curls are very people-oriented, faithful, affectionate soulmates, adjusting remarkably fast to other pets, children, and new situations.","life_span":"12 - 16","indoor":0,"lap":1,"alt_names":"","adaptability":5,"affection_level":5,"child_friendly":4,"dog_friendly":5,"energy_level":3,"grooming":2,"health_issues":1,"intelligence":3,"shedding_level":3,"social_needs":3,"stranger_friendly":3,"vocalisation":3,"experimental":0,"hairless":0,"natural":0,"rare":0,"rex":0,"suppressed_tail":0,"short_legs":0,"wikipedia_url":"https://en.wikipedia.org/wiki/American_Curl","hypoallergenic":0,"reference_image_id":"xnsqonbjW"}],"id":"ji-5E0VwY","url":"https://cdn2.thecatapi.com/images/ji-5E0VwY.jpg","width":1250,"height":702},
  {"breeds":[{"weight":{"imperial":"8 - 18","metric":"4 - 8"},"id":"bslo","name":"British Longhair","temperament":"Affectionate, Easy Going, Independent, Intelligent, Loyal, Social","origin":"United Kingdom","country_codes":"GB","country_code":"GB","description":"The British Longhair is a very laid-back relaxed cat, often perceived to be very independent although they will enjoy the company of an equally relaxed and likeminded cat. They are an affectionate breed, but very much on their own terms and tend to prefer to choose to come and sit with their owners rather than being picked up.","life_span":"12 - 14","indoor":0,"alt_names":"","adaptability":5,"affection_level":5,"child_friendly":4,"dog_friendly":5,"energy_level":4,"grooming":5,"health_issues":1,"intelligence":5,"shedding_level":1,"social_needs":3,"stranger_friendly":4,"vocalisation":1,"experimental":0,"hairless":0,"natural":0,"rare":0,"rex":0,"suppressed_tail":0,"short_legs":0,"wikipedia_url":"https://en.wikipedia.org/wiki/British_Longhair","hypoallergenic":0,"reference_image_id":"7isAO4Cav"}],"id":"re7uO34hz","url":"https://cdn2.thecatapi.com/images/re7uO34hz.jpg","width":1600,"height":2397}
];

const server = setupServer(
  rest.get(`${process.env.REACT_APP_ENDPOINT}/v1/images/search`, (req, res, ctx) => {
    return res(ctx.json(json));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should fetch cats", async () => {
  const { result } = renderHook(() => useCats(10));
  expect(result.current.page).toBe(0);
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.items.length).toBe(0);
  expect(result.current.error).toBe(null);

  act(() => {
    result.current.loadMore();
  });

  await waitFor(() => {
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(2);
    expect(result.current.error).toBe(null);
  });

  act(() => {
    result.current.loadMore();
  });

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => {
    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.items.length).toBe(4);
    expect(result.current.error).toBe(null);
  });
});
