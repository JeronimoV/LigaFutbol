import styles from "./partidos.module.css";
import MatchPanel from "@/components/panels/matchPanel/matchPanel";

const Partidos = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="partidos.png" />
      <MatchPanel />
    </div>
  );
};

export default Partidos;
