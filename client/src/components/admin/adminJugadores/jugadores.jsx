import styles from "./jugadores.module.css"
import { useEffect, useState } from "react"
import { storage } from "../../utils/firebase"
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import swal from "sweetalert"

const Jugadores = () => {
    
    const [allTeams, setAllTeams] = useState(null)
    const [allPlayers, setAllPlayers] = useState(null)
    const [optionSelected, setOptionSelected] = useState(null)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [dataToSend, setDataToSend] = useState(null)

    const getPlayers = async() => {
        await fetch("http://localhost:3001/player").then(response => response.json()).then(response => setAllPlayers(response))
    }

    const getTeams = async() => {
        await fetch("http://localhost:3001/team").then(response => response.json()).then(response => setAllTeams(response))
    }

    useEffect(() => {
        getPlayers()
        getTeams()
    }, [])

    const cancelButton = () => {
        setOptionSelected(null)
        setDataToSend(null)
        setSelectedPlayer(null)
    }

    const uploadImage = async (e) => {
        const fileName = e.target.files[0]
        const imageRef = ref(storage, `${e.target.name}/${fileName.name + v4()}`)
        await uploadBytes(imageRef, fileName).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(response => setDataToSend({...dataToSend, picture: response}))
        })
    }

    const createPlayerSend = async(e) => {
        console.log(dataToSend);
        e.preventDefault()
        const response = await fetch("http://localhost:3001/player/create", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok){
            return response.json()
          }else{
            throw new Error("Algo salio mal, asegurate de que no exista otro partido con los mismos equipos, si el error sigue avisame.")
          }}).then(response => {
            const allPlayersUpdated = allPlayers.filter(value => value.id !== dataToSend.id)
            allPlayersUpdated.push(response)
            setAllPlayers(allPlayersUpdated)
        }).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
          setOptionSelected(null)
          setDataToSend(null)
          console.log("create team", response);
    }

    const modifyPlayer = async(e) => {
        console.log(dataToSend);
        e.preventDefault()
        const response = await fetch("http://localhost:3001/player/", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok){
            return response.json()
          }else{
            throw new Error("Algo salio mal, asegurate de que no exista otro partido con los mismos equipos, si el error sigue avisame.")
          }}).then(response => {
            const allPlayersUpdated = allPlayers.filter(value => value.id !== dataToSend.id)
            allPlayersUpdated.push(response)
            setAllPlayers(allPlayersUpdated)
        }).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
          setOptionSelected(null)
          setDataToSend(null)
          setSelectedPlayer(null)
    }

    const modifyPlayerPoints = async(e) => {
        console.log(dataToSend);
        e.preventDefault()
        const response = await fetch("http://localhost:3001/player/goals", {
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
          setSelectedPlayer(null)
    }

    const deletePlayer = async(e) => {
        e.preventDefault()
        swal({
            title: "Estas seguro??",
            text: "Si aprietas ´ok´ el jugador se eliminara permanentemente!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const response = await fetch(`http://localhost:3001/player/${selectedPlayer.name}`, {
                    method: 'DELETE',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                  })
                  const allPlayersUpdated = allPlayers.filter(value => value.id !== dataToSend.id)
                  setAllPlayers(allPlayersUpdated)
                  setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedPlayer(null)
            } else {
              swal("El jugador no fue eliminado!");
              setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedPlayer(null)
            }
          });
    }

    console.log(allPlayers);

    const selectTeamInput = async (e) => {
        setOptionSelected(e.target.name)
        const player = await allPlayers.find(value => value.name === e.target.value)
        setSelectedPlayer(player)
        setDataToSend({...dataToSend, id: player.id})
    }

    return(
        <div className={styles.container}>
            <div className={styles.options}>
                <p>Crear Jugador</p>
                {optionSelected === "create player" ? null : <button className={styles.submit} onClick={() => setOptionSelected("create player")}>Empezar</button>}
                {optionSelected === "create player" ? 
                <form onSubmit={createPlayerSend}>
                    <select onChange={(e) => setDataToSend({...dataToSend, team: e.target.value})}>
                        <option selected disabled>Elije un equipo</option>
                        {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                    </select>
                    <input name="name" placeholder="Nombre del Jugador" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})}/>
                    <input name="position" placeholder="Posicion del Jugador" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})}/>
                    <label className={styles.inputFile}>
                        <p>Select. imagen del jugador</p>
                        <input name="players" onChange={uploadImage} type="file"/>
                    </label>
                    {dataToSend && dataToSend.picture ? <img className={styles.teamImg} src={dataToSend.picture}/> : null}
                    {dataToSend && dataToSend.picture && dataToSend.name.length > 0 && dataToSend.position.length > 0 && dataToSend.team ? <button className={styles.submit} type="submit">Crear</button> : <p>Tienes que llenar todos los campos!</p>}
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Modificar Jugador</p>
                {optionSelected === "modify player" ? null : <select name="modify player" onChange={selectTeamInput}>
                    <option selected>Elije un Jugador</option>
                    {allPlayers ? allPlayers.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "modify player" ?
                <form onSubmit={modifyPlayer}>
                    <select onChange={(e) => setDataToSend({...dataToSend, team: e.target.value})}>
                        <option selected disabled>Elije un equipo</option>
                        {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                    </select>
                    <input placeholder="Nombre del Jugador" onChange={(e) => setDataToSend({...dataToSend, name: e.target.value})}/>
                    <input name="position" placeholder="Posicion del Jugador" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})}/>
                    <label className={styles.inputFile}>
                        <p>Select. imagen del jugador</p>
                        <input name="players" onChange={uploadImage} type="file"/>
                    </label>
                    {dataToSend && dataToSend.picture ? <img className={styles.teamImg} src={dataToSend.picture}/> : null}
                    <button className={styles.submit} type="submit">Modificar</button>
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Modificar puntaje Jugador</p>
                {optionSelected === "modify points" ? null : <select name="modify points" onChange={selectTeamInput}>
                    <option selected>Elije un jugador</option>
                    {allPlayers ? allPlayers.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "modify points" ?
                <form onSubmit={modifyPlayerPoints}>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="goals" placeholder="Goles"/>
                    <input type="number" onChange={(e) => setDataToSend({...dataToSend, [e.target.name]: e.target.value})} name="assist" placeholder="Asistencias"/>
                    <button className={styles.submit} type="submit">Modificar Puntajes</button>
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Eliminar Jugador</p>
                {optionSelected === "delete player" ? null : <select name="delete player" onChange={selectTeamInput}>
                    <option selected>Elije un jugador</option>
                    {allPlayers ? allPlayers.map(value => <option>{value.name}</option>) : null}
                </select>}
                {optionSelected === "delete player" ?
                <div>
                    <button onClick={deletePlayer} className={styles.submit}>Eliminar</button>
                    <button onClick={cancelButton} className={styles.cancelar}>Cancelar</button> 
                </div>
                : null}
            </div>
        </div>
    )
}

export default Jugadores