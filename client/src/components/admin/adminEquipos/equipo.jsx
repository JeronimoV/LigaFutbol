"use client"

import { useEffect, useState } from "react"
import styles from "./equipo.module.css"
import { storage } from "../../utils/firebase"
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import swal from "sweetalert"

const Equipo = () => {

    const [allTeams, setAllTeams] = useState(null)
    const [optionSelected, setOptionSelected] = useState(null)
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [dataToSend, setDataToSend] = useState(null)

    const getTeams = async() => {
        await fetch("https://ligaapi.onrender.com/team").then(response => response.json()).then(response => setAllTeams(response))
    }

    useEffect(() => {
        getTeams()
    }, [])

    const cancelButton = () => {
        setOptionSelected(null)
        setDataToSend(null)
        setSelectedTeam(null)
    }

    const uploadImage = async (e) => {
        const fileName = e.target.files[0]
        const imageRef = ref(storage, `${e.target.name}/${fileName.name + v4()}`)
        await uploadBytes(imageRef, fileName).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(response => setDataToSend({...dataToSend, picture: response}))
        })
    }

    const createTeamSend = async(e) => {
        (dataToSend);
        e.preventDefault()
        const response = await fetch("https://ligaapi.onrender.com/team/create", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok){
            return response.json()
          }else{
            throw new Error("Algo salio mal")
          }}).then(response => {
            const allTeamsUpdated = allTeams.filter(value => value.id !== dataToSend.id)
            allTeamsUpdated.push(response)
            setAllTeams(allTeamsUpdated)
        }).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
          setOptionSelected(null)
          setDataToSend(null)
          ("create team", response);
    }

    const modifyTeamSend = async(e) => {
        (dataToSend);
        e.preventDefault()
        const response = await fetch("https://ligaapi.onrender.com/team/", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok){
            return response.json()
          }else{
            throw new Error("Algo salio mal.")
          }}).then(response => {
            const allTeamsUpdated = allTeams.filter(value => value.id !== dataToSend.id)
            allTeamsUpdated.push(response)
            setAllTeams(allTeamsUpdated)
        }).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
          setOptionSelected(null)
          setDataToSend(null)
          setSelectedTeam(null)
    }

    const modifyTeamPointsSend = async(e) => {
        (dataToSend);
        e.preventDefault()
        const response = await fetch("https://ligaapi.onrender.com/team/points", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok === false){
            throw new Error("Algo salio mal")
          }}).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
          setOptionSelected(null)
          setDataToSend(null)
          setSelectedTeam(null)
    }

    const deleteTeam = async(e) => {
        e.preventDefault()
        swal({
            title: "Estas seguro??",
            text: "Si aprietas ´ok´ el equipo se eliminara permanentemente!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const response = await fetch(`https://ligaapi.onrender.com/team/${selectedTeam.name}`, {
                    method: 'DELETE',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                  })
                  const allTeamsUpdated = allTeams.filter(value => value.id !== dataToSend.id)
                  setAllTeams(allTeamsUpdated)
                  setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedTeam(null)
            } else {
              swal("El equipo no fue eliminado!");
              setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedTeam(null)
            }
          });
    }

    const selectTeamInput = async (e) => {
        ("esteee", e.target.value);
        setOptionSelected(e.target.name)
        const team = await allTeams.find(value => value.name === e.target.value)
        ("esteee", team);
        setSelectedTeam(team)
        setDataToSend({...dataToSend, id: team.id})
    }

    (optionSelected);

    return(
        <div className={styles.container}>
            <div className={styles.options}>
                <p>Crear Equipo</p>
                {optionSelected === "create team" ? null : <button className={styles.submit} onClick={() => setOptionSelected("create team")}>Empezar</button>}
                {optionSelected === "create team" ? 
                <form onSubmit={createTeamSend}>
                    <input name="name" placeholder="Nombre del Equipo" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})}/>
                    <label className={styles.inputFile}>
                        <p>Select. Escudo del equipo</p>
                        <input name="team" onChange={uploadImage} type="file"/>
                    </label>
                    {dataToSend && dataToSend.picture ? <img className={styles.teamImg} src={dataToSend.picture}/> : null}
                    {dataToSend && dataToSend.picture && dataToSend.name.length > 0 ? <button className={styles.submit} type="submit">Crear</button> : <p>Tienes que llenar todos los campos!</p>}
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Modificar Equipo</p>
                {optionSelected === "modify team" ? null : <select name="modify team" onChange={selectTeamInput}>
                    <option selected>Elije un equipo</option>
                    {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "modify team" ?
                <form onSubmit={modifyTeamSend}>
                    <input placeholder="Nombre del Equipo" onChange={(e) => setDataToSend({...dataToSend, name: e.target.value})}/>
                    <label className={styles.inputFile}>
                        <p>Select. Escudo del equipo</p>
                        <input name="team" onChange={uploadImage} type="file"/>
                    </label>
                    {dataToSend && dataToSend.picture ? <img className={styles.teamImg} src={dataToSend.picture}/> : null}
                    <button className={styles.submit} type="submit">Modificar</button>
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Modificar puntaje Equipo</p>
                {optionSelected === "modify points" ? null : <select name="modify points" onChange={selectTeamInput}>
                    <option selected>Elije un equipo</option>
                    {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "modify points" ?
                <form onSubmit={modifyTeamPointsSend}>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="gamesPlayed" placeholder="Partidos Jugados"/>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="wins" placeholder="Victorias"/>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="tie" placeholder="Empates"/>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="lose" placeholder="Derrotas"/>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="points" placeholder="Puntos"/>
                    <button className={styles.submit} type="submit">Modificar Puntajes</button>
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Eliminar Equipo</p>
                {optionSelected === "delete team" ? null : <select name="delete team" onChange={selectTeamInput}>
                    <option selected>Elije un equipo</option>
                    {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "delete team" ?
                <div>
                    <button onClick={deleteTeam} className={styles.submit}>Eliminar</button>
                    <button onClick={cancelButton} className={styles.cancelar}>Cancelar</button> 
                </div>
                : null}
            </div>
        </div>
    )
}

export default Equipo