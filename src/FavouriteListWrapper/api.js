export const fetchFavourites = async ({ sub_id }) => {
  let json;

  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/favourites?attach_image=1&sub_id=${sub_id}`, {
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
