import styles from "./inscripciones.module.css";

const Inscripciones = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Inscripcion</p>
      <p className={styles.description}>
        Para inscribirte al torneo deberas comunicarte por WhatsApp al siguiente
        numero
      </p>
      <p className={styles.number}>11 6023-0965</p>
    </div>
  );
};

export default Inscripciones;
