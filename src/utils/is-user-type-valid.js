import environment from "@wepresto/environment";

const isUserTypeValid = (type) => {
  const validTypes = [environment.BORROWER_TYPE, environment.LENDER_TYPE];

  return validTypes.includes(type);
};

export default isUserTypeValid;
