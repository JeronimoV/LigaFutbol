const { Match, Player, Team } = require("../database");

const getAllMatchs = async (req, res) => {
  try {
    const allMatchs = await Match.findAll({
      include: [
        {
          model: Team,
          as: "FirstTeam",
          foreignKey: "FirstTeamId", // La clave foránea en la tabla Match
        },
        {
          model: Team,
          as: "SecondTeam",
          foreignKey: "SecondTeamId", // La otra clave foránea en la tabla Match
        },
      ],
    });
    res.status(200).json(allMatchs);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getMatch = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("No has enviado el id!");
    }
    const actualMatch = await Match.findOne({ where: { id: id } });
    if (!actualMatch) {
      throw new Error("Jugador no encontrado!");
    }
    res.status(200).json(actualMatch);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const createMatch = async (req, res) => {
  const { day, hour, place, placeLink, firstTeamName, secondTeamName } =
    req.body;
  try {
    if (
      !day ||
      !hour ||
      !place ||
      !firstTeamName ||
      !secondTeamName ||
      !placeLink
    ) {
      throw new Error("Tienes que enviar toda la informacion!");
    }

    const FirstTeam = await Team.findOne({ where: { name: firstTeamName } });
    const SecondTeam = await Team.findOne({
      where: { name: secondTeamName },
    });

    const newMatch = await Match.create({
      day,
      hour,
      place,
      placeLink,
      FirstTeamId: FirstTeam.id,
      SecondTeamId: SecondTeam.id,
    });
    if (!newMatch) {
      throw new Error("Algo salio mal!");
    }
    res.status(200).json(newMatch);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const modifyMatch = async (req, res) => {
  const { id, day, hour, place, placeLink } = req.body;
  try {
    if (!day && !hour && !place && !placeLink) {
      throw new Error("No has hecho cambios!");
    }

    const actualMatch = await Match.findOne({ where: { id: id } });

    await actualMatch.update({
      day,
      hour,
      place,
      placeLink,
    });
    res.status(200).json("Partido actualizado con exito!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const matchResult = async (req, res) => {
  const { allGoals, winner, loser, firstTeamId, secondTeamId } = req.body;
  try {
    if (
      !allGoals ||
      !allGoals ||
      !winner ||
      !loser ||
      !firstTeamId ||
      !secondTeamId
    ) {
      throw new Error("No has hecho cambios!");
    }

    /*
    allGoals = [
        {
            name = "Jose"
            goals = 1,
            assist = 2
        }
        {
            name = "Manuel"
            goals = 2,
            assist = 1
        }
    ]
    */
    await Promise.all(
      allGoals.map(async (value) => {
        const actualPlayer = await Player.findOne({
          where: { name: value.name },
        });
        if (!actualPlayer) {
          throw new Error(`El jugador ${value.name} no fue encontrado!`);
        }
      })
    );

    await Promise.all(
      allGoals.map(async (value) => {
        const actualPlayer = await Player.findOne({
          where: { name: value.name },
        });
        actualPlayer.goals += parseInt(value.goals);
        actualPlayer.assist += parseInt(value.assist);
        await actualPlayer.update({
          goals: actualPlayer.goals,
          assist: actualPlayer.assist,
        });
      })
    );

    if (winner && loser) {
      const winnerInfo = await Team.findOne({ where: { id: winner } });
      const loserInfo = await Team.findOne({ where: { id: loser } });

      await winnerInfo.update({
        gamesPlayed: winnerInfo.gamesPlayed + 1,
        wins: winnerInfo.wins + 1,
        points: winnerInfo.points + 3,
      });

      await loserInfo.update({
        gamesPlayed: loserInfo.gamesPlayed + 1,
        lose: loserInfo.lose + 1,
      });
    } else {
      const firstTeamInfo = await Team.findOne({ where: { id: firstTeamId } });
      const secondTeamInfo = await Team.findOne({
        where: { id: secondTeamId },
      });
      await firstTeamInfo.update({
        gamesPlayed: firstTeamInfo.gamesPlayed + 1,
        tie: firstTeamInfo.tie + 1,
        points: firstTeamInfo.points + 1,
      });

      await secondTeamInfo.update({
        gamesPlayed: secondTeamInfo.gamesPlayed + 1,
        tie: secondTeamInfo.tie + 1,
        points: secondTeamInfo.points + 1,
      });
    }

    res.status(200).json("Partido definido con exito!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("No has enviado el id!");
    }
    const actualMatch = await Match.findOne({ where: { id: id } });
    if (!actualMatch) {
      throw new Error("Partido no encontrado!");
    }
    await actualMatch.destroy();
    res.status(200).json("Partido eliminado con exito!");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllMatchs,
  getMatch,
  createMatch,
  modifyMatch,
  matchResult,
  deleteMatch,
};
