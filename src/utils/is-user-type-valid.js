const isUserTypeValid = (type) => {
  const validTypes = [process.env.NEXT_PUBLIC_BORROWER_TYPE, process.env.NEXT_PUBLIC_LENDER_TYPE];

  return validTypes.includes(type);
};

export default isUserTypeValid;
