"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./navBarComponent.module.css"
import { useState, useEffect } from "react"

const NavBar = () => {
    
    const [isWindow, setIsWindow] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
      if (window && typeof window != "undefined") {
        setIsWindow(true);
      }
    }, []);
  
    useEffect(() => {
      if (isWindow) {
        const response = localStorage.getItem("admin");
        (response);
        if(response && response === "true"){
            setIsAdmin(true)
        }
      }
    }, [isWindow]);

    const params = usePathname()

    return(
        <div className={styles.container}>
            <div className={params.split("/")[1] === "clasificacion" ? styles.selectDivActivated : styles.selectDiv}>
                <div className={styles.select}></div>
                <Link className={styles.link} href={"/clasificacion"}>Clasificacion</Link>
            </div>
            <div className={params.split("/")[1] === "jugadores" ? styles.selectDivActivated : styles.selectDiv}>
                <div className={styles.select}></div>
                <Link className={styles.link} href={"/jugadores"} >Mejores Jugadores</Link>
            </div>
            <div className={params.split("/")[1] === "partidos" ? styles.selectDivActivated : styles.selectDiv}>
                <div className={styles.select}></div>
                <Link className={styles.link} href={"/partidos"} >Partidos</Link>
            </div>
            <div className={params.split("/")[1] === "inscripciones" ? styles.selectDivActivated : styles.selectDiv}>
                <div className={styles.select}></div>
                <Link className={styles.link} href={"/inscripciones"} >Inscripciones</Link>
            </div>
            {
                isAdmin ? 
                <div className={params.split("/")[1] === "admin" ? styles.selectDivActivated : styles.selectDiv}>
                   <div className={styles.select}></div>
                   <Link className={styles.link} href={"/admin"} >Admin Panel</Link>
                </div>: <Link className={styles.linkLogin} href={"/login"}>Ingresar</Link>
            }
        </div>
    )
}

export default NavBar