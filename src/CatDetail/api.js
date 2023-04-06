export const addFavourite = async ({ image_id, sub_id }) => {
  let json;

  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/favourites`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.REACT_APP_ENDPOINT_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        image_id,
        sub_id,
      })
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

export const delFavourite = async ({ image_id }) => {
  let json;

  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/v1/favourites/${image_id}`, {
      method: 'DELETE',
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
