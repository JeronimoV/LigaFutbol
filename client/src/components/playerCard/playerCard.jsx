import styles from "./cardStyle.module.css"
import Link from "next/link"

const PlayerCard = ({data, position, mvp}) => {
    return(
        <Link href={`/jugadores/${data.name}`} className={styles.clasification}>
        <div className={styles.clasificacionCard}>
          <div className={styles.teamInfo}>
            <p className={styles.position}>{position}</p>
            <img src={data.picture} />
            <p className={styles.teamName}>{data.name}</p>
          </div>
          {mvp && mvp === 1 ? <p className={styles.mvp}>MVP</p> : null}
          <div className={styles.points}>
            <p>Goles: {data.goals}</p>
            <p>Asistencias: {data.assist}</p>
          </div>
        </div>
      </Link>
    )
}

export default PlayerCard