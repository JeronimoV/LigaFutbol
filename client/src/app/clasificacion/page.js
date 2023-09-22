"use client";

import styles from "./clasification.module.css";
import { storage } from "../../components/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";

const Clasificacion = (e) => {
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ligafutbol-ccc4c.appspot.com/o/clasificacion?alt=media&token=0619dcc3-7848-429c-afed-65439252624b"
  );

  const uploadImage = async (e) => {
    e.preventDefault();
    const fileName = e.target.files[0];
    const imageRef = ref(storage, `clasificacion`);
    await uploadBytes(imageRef, fileName).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((response) => setImage(response));
    });
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src="clasificacion.png" />
      <p className={styles.title}>Tabla de clasificacion</p>
      <p>Actualizar tabla</p>
      <input type="file" onChange={uploadImage} />
      <img className={styles.clasificationImage} src={image} />
    </div>
  );
};

export default Clasificacion;
