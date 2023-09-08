"use client";

import { useEffect, useState } from "react";
import styles from "./login.module.css";
import swal from "sweetalert";

const Login = () => {
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
      response;
      if (response && response === "true") {
        setIsAdmin(true);
      }
    }
  }, [isWindow]);

  useEffect(() => {
    if (isAdmin) {
      localStorage.clear();
      window.location.reload();
    }
  }, [isAdmin]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    await fetch("https://ligaapi.onrender.com/user/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.json());
        }
      })
      .then(
        async (response) =>
          await swal({
            title: "Bienvenido",
            text: `Haz iniciado sesion correctamente`,
            icon: "success",
          })
      )
      .then((response) => {
        localStorage.setItem("admin", "true");
        window.location.href = "/clasificacion";
      })
      .catch(
        async (err) =>
          await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",
          })
      );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDiv}>
        <div className={styles.head}>
          <p className={styles.title}>Inicia Sesion</p>
          <p className={styles.subTitle}>Por favor, ingrese sus datos</p>
        </div>
        <form onSubmit={submitData} className={styles.form}>
          <input
            onChange={inputHandler}
            name="email"
            value={loginData.email}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={inputHandler}
            name="password"
            value={loginData.password}
            placeholder="Contraseña"
          />
          <button>Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
