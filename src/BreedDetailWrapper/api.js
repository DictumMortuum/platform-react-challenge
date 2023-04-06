export const fetchBreedDetails = async ({ breed_id, limit }) => {
  let json;

  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/images/search?breed_ids=${breed_id}&limit=${limit}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_ENDPOINT_KEY,
      },
    });
    json = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        err: error
      };
    } else {
      return {
        err: error
      };
    }
  }

  if (json) {
    return {
      json
    };
  }
}
