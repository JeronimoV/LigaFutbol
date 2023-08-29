"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import dynamic from "next/dynamic";
const Jugadores = dynamic(
  () => import("@/components/admin/adminJugadores/jugadores"),
  {
    ssr: false,
  }
);
const Partidos = dynamic(
  () => import("@/components/admin/adminPartidos/partidos"),
  {
    ssr: false,
  }
);
const Equipo = dynamic(() => import("@/components/admin/adminEquipos/equipo"), {
  ssr: false,
});

const Admin = () => {
  const [panelSelection, setPanelSelection] = useState(null);
  const [isWindow, setIsWindow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      setIsWindow(true);
    }
  }, []);

  useEffect(() => {
    if (isWindow) {
      const response = localStorage.getItem("admin");
      console.log(response);
      if (response && response === "true") {
        setIsAdmin(true);
      }
    }
  }, [isWindow]);

  if (isAdmin) {
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
  } else {
    return <p className={styles.adminError}>No eres un administrador!</p>;
  }
};

export default Admin;
