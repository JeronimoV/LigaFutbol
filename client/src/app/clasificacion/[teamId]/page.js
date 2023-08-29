"use client";

import { usePathname } from "next/navigation";
import styles from "./teamInfo.module.css";
import { useEffect, useState } from "react";
import PlayerCard from "@/components/playerCard/playerCard";

const TeamInfo = () => {
  const [teamData, setTeamData] = useState(null);
  const [allPlayers, setAllPlayers] = useState(null);

  const params = usePathname();

  const getTeam = async () => {
    await fetch(`https://ligaapi.onrender.com/team/${params.split("/")[2]}`)
      .then((response) => response.json())
      .then((response) => setTeamData(response));
  };

  const getPlayers = async () => {
    if (teamData && teamData.id) {
      await fetch(`https://ligaapi.onrender.com/player/team/${teamData.id}`)
        .then((response) => response.json())
        .then((response) =>
          response.sort((a, b) => {
            if (a.goals * 2 + a.assist > b.goals * 2 + b.assist) {
              return -1;
            } else {
              return 1;
            }
          })
        )
        .then((response) => setAllPlayers(response));
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    getPlayers();
  }, [teamData]);

  if (!teamData || !allPlayers) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={teamData.picture} />
        <div className={styles.data}>
          <p className={styles.teamName}>{teamData.name}</p>
          <div className={styles.points}>
            <p>PJ: {teamData.gamesPlayed}</p>
            <p>G: {teamData.wins}</p>
            <p>E: {teamData.tie}</p>
            <p>P: {teamData.lose}</p>
            <p>PTs: {teamData.points}</p>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <p>Mejores Jugadores</p>
        {allPlayers && allPlayers.length > 0
          ? allPlayers.map((value, index) => (
              <PlayerCard
                data={value}
                position={index + 1 + "°"}
                mvp={index + 1}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TeamInfo;
