const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, passwordCompare) => {
  const response = await bcrypt.compare(password, passwordCompare);
  return response;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
