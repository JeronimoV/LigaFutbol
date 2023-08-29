"use client";

import { useState } from "react";
import styles from "./admin.module.css";
import Equipo from "@/components/admin/adminEquipos/equipo";
import Jugadores from "@/components/admin/adminJugadores/jugadores";
import Partidos from "@/components/admin/adminPartidos/partidos";

const Admin = () => {
  const [panelSelection, setPanelSelection] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        <div onClick={() => setPanelSelection("partidos")}>
          <p>Partidos</p>
        </div>
        <div onClick={() => setPanelSelection("equipos")}>
          <p>Equipos</p>
        </div>
        <div onClick={() => setPanelSelection("jugadores")}>
          <p>Jugadores</p>
        </div>
      </div>
      {panelSelection === "partidos" ? (
        <Partidos />
      ) : panelSelection === "equipos" ? (
        <Equipo />
      ) : panelSelection === "jugadores" ? (
        <Jugadores />
      ) : null}
    </div>
  );
};

export default Admin;
