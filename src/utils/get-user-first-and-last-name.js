const getUserFirstAndLastName = (fullName) => {
  if (!fullName) return undefined;

  const [ a, b, c ] = fullName.split(" ");

  let firstName = a;

  let lastName;
  if (c) lastName = c;
  else if (b && !c) lastName = b;

  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  return `${firstName} ${lastName}`;
};

export default getUserFirstAndLastName;
