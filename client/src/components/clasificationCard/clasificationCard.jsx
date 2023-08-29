import styles from "./cardStyle.module.css"
import Link from "next/link";

const ClasificationCard = ({data, position}) => {
    return(
        <Link href={`/clasificacion/${data.id}`} className={styles.clasification}>
        <div className={styles.clasificacionCard}>
          <div className={styles.teamInfo}>
            <p className={styles.position}>{position}</p>
            <img src={data.picture} />
            <p className={styles.teamName}>{data.name}</p>
          </div>
          <div className={styles.points}>
            <p>PJ: {data.gamesPlayed}</p>
            <p>G: {data.wins}</p>
            <p>E: {data.tie}</p>
            <p>P: {data.lose}</p>
            <p>PTs: {data.points}</p>
          </div>
        </div>
      </Link>
    )
}

export default ClasificationCard