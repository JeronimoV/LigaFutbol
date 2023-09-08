const { User } = require("../database");
const {
  encryptPassword,
  comparePassword,
} = require("../utils/encryptPassword");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Faltan datos!");
    }

    const actualEmail = email.toLowerCase();

    const actualUser = await User.findOne({ where: { email: actualEmail } });

    if (!actualUser) {
      throw new Error("El email no existe!");
    }

    const response = await comparePassword(password, actualUser.password);
    if (response) {
      res.status(200).json(true);
    } else {
      throw new Error("El email y la contraseña no coinciden!");
    }
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Faltan datos!");
    }

    const actualEmail = email.toLowerCase();

    const actualUser = await User.findOne({ where: { email: actualEmail } });

    if (actualUser) {
      throw new Error("El email ya existe!");
    }

    const response = await encryptPassword(password);

    const newUser = await User.create({
      email: actualEmail,
      password: response,
      admin: true,
    });

    if (newUser) {
      res.status(200).json(newUser);
    } else {
      throw new Error("Algo salio mal!");
    }
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

module.exports = {
  login,
  register,
};
