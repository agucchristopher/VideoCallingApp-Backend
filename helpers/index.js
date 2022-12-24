export const checkSignup = (req, res, next) => {
  const { username, first_name, last_name, password, country, gender, email } =
    req.body;
  if (
    username == "" ||
    first_name == "" ||
    last_name == "" ||
    password == "" ||
    country == "" ||
    gender == "" ||
    email == ""
  ) {
    res.status(401).json({
      status: "error",
      message: "Required Field Are Missing!",
    });
  } else {
    next();
  }
};
