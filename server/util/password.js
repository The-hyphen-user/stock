
const bcrypt = require("bcryptjs");



const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch;
};  

module.exports = {
  hashPassword,
  comparePassword
};