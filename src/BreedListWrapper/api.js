export const fetchBreeds = async () => {
  let json;

  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/breeds`, {
      headers: {
        'x-api-key': process.env.REACT_APP_ENDPOINT_KEY
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
