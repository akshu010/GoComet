/* eslint-disable no-useless-escape */
const checkValidateData = (email, password) => {
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
      password
    );
  if (!emailValidation) return "Invalid email address";
  if (!passwordValidation) return "Invalid Password";

  return null;
};
export default checkValidateData;
