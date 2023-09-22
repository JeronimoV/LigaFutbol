"use client";

import { useState } from "react";
import styles from "./login.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const Login = () => {
  const [data, setData] = useState(null);

  const router = useRouter();

  const user = "jeronimoevilar@outlook.com";
  const contraseña = "jero2003";

  const handlerInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlerLogin = async (e) => {
    e.preventDefault();
    localStorage.clear();
    if (
      data.email.toUpperCase() === user.toUpperCase() &&
      data.password.toUpperCase() === contraseña.toUpperCase()
    ) {
      await swal({
        title: "Bienvenido",
        text: `Usuario logueado correctamente!`,
        icon: "success",
      })
        .then((response) => localStorage.setItem("admin", "true"))
        .then((response) => router.push("/clasificacion"));
    } else {
      await swal({
        title: "Algo salio mal...",
        text: `La contraseña o el email tienen un error!`,
        icon: "error",
      }).then((response) => localStorage.clear());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <div className={styles.head}>
          <p className={styles.title}>Inicia Sesion</p>
          <p className={styles.subTitle}>Por favor, ingrese sus datos</p>
        </div>
        <form onSubmit={handlerLogin} className={styles.form}>
          <input onChange={handlerInput} name="email" placeholder="Email" />
          <input
            type="password"
            onChange={handlerInput}
            name="password"
            placeholder="Contraseña"
          />
          <button>Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
