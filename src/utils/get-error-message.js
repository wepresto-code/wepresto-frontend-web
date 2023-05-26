const getErrorMessage = (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
 
  if (error.response) {
    const { data } = error.response;

    if (data && data.message) {
      return data.message;
    }
  }

  if (error.message) {
    return error.message;
  }

  return "something went wrong";
};

export default getErrorMessage;
