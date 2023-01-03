import validator from "validator";
export const checkSignup = (req, res, next) => {
  const { username, first_name, last_name, password, country, gender, email } =
    req.body;
  try {
    if (
      (!username, !first_name, !last_name, !password, !country, !gender, !email)
    ) {
      throw Error("Required Fields Are Empty!");
    }
    if (!validator.isEmail(email.toLowerCase())) {
      throw Error("Invalid Email");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  next();
};
export const generateotpcode = () => {
  let token = Math.floor(Math.random() * 10000);
  return token;
};
