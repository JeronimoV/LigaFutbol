"use client"

import styles from "./partidos.module.css"
import { useEffect, useState } from "react"
import swal from "sweetalert"

const Partidos = () => {
    const [allTeams, setAllTeams] = useState(null)
    const [allMatchs, setAllMatchs] = useState(null)
    const [optionSelected, setOptionSelected] = useState(null)
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [dataToSend, setDataToSend] = useState(null)

    const getTeams = async() => {
        await fetch("https://ligaapi.onrender.com/team").then(response => response.json()).then(response => setAllTeams(response))
    }

    const getMatchs = async() => {
        await fetch("https://ligaapi.onrender.com/game").then(response => response.json()).then(response => setAllMatchs(response))
    }

    useEffect(() => {
        getTeams()
        getMatchs()
    }, [])

    const cancelButton = () => {
        setOptionSelected(null)
        setDataToSend(null)
        setSelectedMatch(null)
    }

    const createMatchSend = async(e) => {
        (dataToSend);
        e.preventDefault()
        const response = await fetch("https://ligaapi.onrender.com/game/create", {
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
            (response);
            const allMatchUpdated = allMatchs.filter(value => value.id !== dataToSend.id)
            allMatchUpdated.push(response)
            setAllMatchs(allMatchUpdated)
            setOptionSelected(null)
            setDataToSend(null)
            ("create team", response);
        }).catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
    }

    const modifyMatch = async(e) => {
        (dataToSend);
        e.preventDefault()
        const response = await fetch("https://ligaapi.onrender.com/game/", {
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
          setSelectedMatch(null)
    }

    const deleteMatch = async(e) => {
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
                const response = await fetch(`https://ligaapi.onrender.com/game/${selectedMatch.id}`, {
                    method: 'DELETE',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                  })
                  const allMatchUpdated = allMatchs.filter(value => value.id !== dataToSend.id)
                  setAllMatchs(allMatchUpdated)
                  setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedMatch(null)
            } else {
              swal("El jugador no fue eliminado!");
              setOptionSelected(null)
                  setDataToSend(null)
                  setSelectedMatch(null)
            }
          });
    }

    const selectTeamInput = async (e) => {
        setOptionSelected(e.target.name)
        const matchName = e.target.value
        const firstTeamName = matchName.split("VS")[0]
        const secondTeamName = matchName.split("VS")[1]
        const firstTeam = await allTeams.find(value => value.name === firstTeamName.trim())
        const secondTeam = await allTeams.find(value => value.name === secondTeamName.trim())
        const match = await allMatchs.find(value => (value.FirstTeamId === firstTeam.id && value.SecondTeamId === secondTeam.id) || (value.FirstTeamId === secondTeam.id && value.SecondTeamId === firstTeam.id))
        setSelectedMatch(match)
        setDataToSend({...dataToSend, id: match.id})
    }

    const matchNameGenerator = (firstId, secondId) => {
        if(!allTeams){
            return
        }
        const firstTeam =  allTeams.find(value => value.id === firstId)
        const secondTeam = allTeams.find(value => value.id === secondId)
        if(firstTeam && secondTeam){
        const matchNameGenerated = `${firstTeam.name} VS ${secondTeam.name}`
        return matchNameGenerated}
    }

    (dataToSend);

    return(
        <div className={styles.container}>
            <div className={styles.options}>
                <p>Crear Partido</p>
                {optionSelected === "create match" ? null : <button className={styles.submit} onClick={() => setOptionSelected("create match")}>Empezar</button>}
                {optionSelected === "create match" ? 
                <form onSubmit={createMatchSend}>
                    <select onChange={(e) => setDataToSend({...dataToSend, firstTeamName: e.target.value})}>
                        <option selected disabled>Elije un equipo</option>
                        {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                    </select>
                    <p>VS</p>
                    <select onChange={(e) => setDataToSend({...dataToSend, secondTeamName: e.target.value})}>
                        <option selected disabled>Elije un equipo</option>
                        {allTeams ? allTeams.map(value => <option>{value.name}</option>) : null}
                    </select>
                    <input placeholder="Dia" onChange={(e) => setDataToSend({...dataToSend, day: e.target.value})}/>
                    <input placeholder="Hora" onChange={(e) => setDataToSend({...dataToSend, hour: e.target.value})}/>
                    <input placeholder="Lugar" onChange={(e) => setDataToSend({...dataToSend, place: e.target.value})}/>
                    <input placeholder="Link de GoogleMaps" onChange={(e) => setDataToSend({...dataToSend, placeLink: e.target.value})}/>
                    {dataToSend && dataToSend.firstTeamName && dataToSend.secondTeamName && dataToSend.day && dataToSend.hour && dataToSend.place && dataToSend.placeLink ? <button className={styles.submit} type="submit">Crear</button> : <p>Tienes que llenar todos los campos!</p>}
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Modificar Partido</p>
                {optionSelected === "modify match" ? null : <select name="modify match" onChange={selectTeamInput}>
                    <option selected disabled>Elije un Partido</option>
                    {allMatchs && allMatchs.length > 0 ? allMatchs.map(value => <option>{matchNameGenerator(value.FirstTeamId, value.SecondTeamId, value)}</option>) : null}
                </select>}
                {optionSelected === "modify match" ?
                <form onSubmit={modifyMatch}>
                    <input placeholder="Dia" onChange={(e) => setDataToSend({...dataToSend, day: e.target.value})}/>
                    <input placeholder="Hora" onChange={(e) => setDataToSend({...dataToSend, hour: e.target.value})}/>
                    <input placeholder="Lugar" onChange={(e) => setDataToSend({...dataToSend, place: e.target.value})}/>
                    <input placeholder="Link de GoogleMaps" onChange={(e) => setDataToSend({...dataToSend, placeLink: e.target.value})}/>
                    <button className={styles.submit} type="submit">Modificar</button>
                    <button onClick={cancelButton} className={styles.cancelar} type="reset">Cancelar</button>
                </form> : null}
            </div>
            <div className={styles.options}>
                <p>Eliminar Partido</p>
                {optionSelected === "delete match" ? null : <select name="delete match" onChange={selectTeamInput}>
                    <option selected disabled>Elije un partido</option>
                    {allMatchs && allMatchs.length > 0 ? allMatchs.map(value => <option>{matchNameGenerator(value.FirstTeamId, value.SecondTeamId, value)}</option>) : null}
                </select>}
                {optionSelected === "delete match" ?
                <div>
                    <button onClick={deleteMatch} className={styles.submit}>Eliminar</button>
                    <button onClick={cancelButton} className={styles.cancelar}>Cancelar</button> 
                </div>
                : null}
            </div>
        </div>
    )
}

export default Partidos