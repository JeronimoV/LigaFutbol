const { Team } = require("../database");

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await Team.findAll();
    res.status(200).json(allTeams);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const getTeam = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("No has enviado el id!");
    }
    const actualTeam = await Team.findOne({ where: { id: id } });
    if (!actualTeam) {
      throw new Error("Equipo no encontrado!");
    }
    res.status(200).json(actualTeam);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const createTeam = async (req, res) => {
  const { name, picture } = req.body;
  try {
    if (!name || !picture) {
      throw new Error("Tienes que enviar toda la informacion!");
    }
    const newTeam = await Team.create({
      name,
      picture,
    });
    if (!newTeam) {
      throw new Error("Algo salio mal!");
    }
    res.status(200).json(newTeam);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const modifyTeam = async (req, res) => {
  const { id, name, picture } = req.body;
  try {
    name, picture;
    if (!name && !picture) {
      throw new Error("No has hecho cambios!");
    }
    const actualTeam = await Team.findOne({ where: { id: id } });
    const updatedTeam = await actualTeam.update({
      name,
      picture,
    });
    res.status(200).json(updatedTeam);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const modifyTeamPoints = async (req, res) => {
  const { id, gamesPlayed, wins, tie, lose, points } = req.body;
  try {
    const actualTeam = await Team.findOne({ where: { id: id } });
    await actualTeam.update({
      gamesPlayed,
      wins,
      tie,
      lose,
      points,
    });
    res.status(200).json("Equipo actualizado con exito!");
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const deleteTeam = async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) {
      throw new Error("No has enviado el nombre!");
    }
    const actualTeam = await Team.findOne({ where: { name: name } });
    if (!actualTeam) {
      throw new Error("Equipo no encontrado!");
    }
    await actualTeam.destroy();
    res.status(200).json("Equipo eliminado con exito!");
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllTeams,
  getTeam,
  createTeam,
  modifyTeam,
  modifyTeamPoints,
  deleteTeam,
};
