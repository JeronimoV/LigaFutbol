import styles from "./jugadores.module.css";
import PlayersPanel from "@/components/panels/playersPanel/playersPanel";

const Jugadores = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="mejoresJugadores.png" />
      <p className={styles.title}>Tabla de Mejores Jugadores</p>
      <PlayersPanel />
    </div>
  );
};

export default Jugadores;
