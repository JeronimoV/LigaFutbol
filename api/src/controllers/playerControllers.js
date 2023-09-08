const { Player, Team } = require("../database");

const getAllPlayer = async (req, res) => {
  try {
    const actualPlayer = await Player.findAll();
    res.status(200).json(actualPlayer);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const getAllTeamPlayers = async (req, res) => {
  const { teamId } = req.params;
  try {
    const actualPlayer = await Player.findAll({
      where: { TeamId: teamId },
      include: Team,
    });

    res.status(200).json(actualPlayer);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const getPlayer = async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) {
      throw new Error("No has enviado el nombre!");
    }
    const actualPlayer = await Player.findOne({
      where: { name: name },
      include: Team,
    });
    if (!actualPlayer) {
      throw new Error("Jugador no encontrado!");
    }
    res.status(200).json(actualPlayer);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const createPlayer = async (req, res) => {
  const { name, picture, position, team } = req.body;
  try {
    if (!name || !picture || !position) {
      throw new Error("Tienes que enviar toda la informacion!");
    }
    const playerTeam = await Team.findOne({ where: { name: team } });
    const newPlayer = await Player.create({
      name,
      picture,
      position,
      TeamId: playerTeam.id,
    });
    if (!newPlayer) {
      throw new Error("Algo salio mal!");
    }
    res.status(200).json(newPlayer);
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const modifyPlayer = async (req, res) => {
  const { id, name, picture, position, team } = req.body;
  try {
    if (!name && !picture && !position && !team) {
      throw new Error("No has hecho cambios!");
    }
    const actualPlayer = await Player.findOne({ where: { id: id } });
    if (team) {
      const playerTeam = await Team.findOne({ where: { name: team } });
      const updatedPlayer = await actualPlayer.update({
        name,
        picture,
        position,
        TeamId: playerTeam.id,
      });
      res.status(200).json(updatedPlayer);
    } else {
      const updatedPlayer = await actualPlayer.update({
        name,
        picture,
        position,
      });
      res.status(200).json(updatedPlayer);
    }
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const modifyPlayerGoals = async (req, res) => {
  const { id, goals, assist } = req.body;
  try {
    if (!goals && !assist) {
      throw new Error("No has hecho cambios!");
    }
    const actualPlayer = await Player.findOne({ where: { id: id } });
    await actualPlayer.update({
      goals,
      assist,
    });
    res.status(200).json("Jugador actualizado con exito!");
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

const deletePlayer = async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) {
      throw new Error("No has enviado el nombre!");
    }
    const actualPlayer = await Player.findOne({ where: { name: name } });
    if (!actualPlayer) {
      throw new Error("Jugador no encontrado!");
    }
    await actualPlayer.destroy();
    res.status(200).json("Jugador eliminado con exito!");
  } catch (error) {
    error;
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllPlayer,
  getAllTeamPlayers,
  getPlayer,
  createPlayer,
  modifyPlayer,
  modifyPlayerGoals,
  deletePlayer,
};
