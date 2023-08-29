"use client";

import { usePathname } from "next/navigation";
import styles from "./playerInfo.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

const PlayerInfo = () => {
  const [playerData, setPlayerData] = useState(null);

  const params = usePathname();

  const getPlayer = async () => {
    await fetch(`http://localhost:3001/player/${params.split("/")[2]}`)
      .then((response) => response.json())
      .then((response) => setPlayerData(response));
  };

  useEffect(() => {
    getPlayer();
  }, []);

  if (!playerData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <img src={playerData.picture} />
      <div className={styles.playerData}>
        <p className={styles.name}>{playerData.name}</p>
        <div className={styles.data}>
          <p>Goles: {playerData.goals}</p>
          <p>Asistencias: {playerData.assist}</p>
          <p>Posicion: {playerData.position}</p>
        </div>
      </div>
      <Link
        className={styles.teamLink}
        href={`/clasificacion/${playerData.Team.id}`}
      >
        Ver Equipo
      </Link>
    </div>
  );
};

export default PlayerInfo;
