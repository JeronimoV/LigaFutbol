import styles from "./clasification.module.css";
import ClasificationPanel from "@/components/panels/clasificationPanel/clasificationPanel";

const Clasificacion = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src="clasificacion.png" />
      <p className={styles.title}>Tabla de clasificacion</p>
      <ClasificationPanel />
    </div>
  );
};

export default Clasificacion;
