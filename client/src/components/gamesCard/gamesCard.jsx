"use client"

import Link from "next/link";
import styles from "./cardStyle.module.css"
import { useEffect, useState } from "react"
import swal from "sweetalert";

const GamesCard = ({data}) => {

  console.log(data);

  const [firstTeamPlayers, setFirstTeamPlayers] = useState(null)
  const [secondTeamPlayers, setSecondTeamPlayers] = useState(null)
  const [inputGoals, setInputGoals] = useState([])
  const [inputAssist, setInputAssist] = useState([])
  const [winner, setWinner] = useState("")
  const [show, setShow] = useState("none")

  const getTeamsPlayers = async() => {
    await fetch(`https://ligaapi.onrender.com/player/team/${data.FirstTeam.id}`)
      .then((response) => response.json())
      .then((response) => setFirstTeamPlayers(response));
    await fetch(`https://ligaapi.onrender.com/player/team/${data.SecondTeam.id}`)
      .then((response) => response.json())
      .then((response) => setSecondTeamPlayers(response));
  }

  useEffect(() => {
    getTeamsPlayers()
  }, [data])

  const addInput = (e) => {
    if(e.target.name === "newGoal"){
      setInputGoals([...inputGoals, {
        name:"",
        goals:0,
      }])
    }else{
      setInputAssist([...inputAssist, {
        name:"",
        assist: 0,
      }])
    }
  }

  const deleteInput = (index, e) => {
    if(e.target.name === "newGoal"){
      const newInputGoals = [...inputGoals]; // Hacer una copia del array
      newInputGoals.splice(index, 1); // Eliminar el elemento en el índice dado
      setInputGoals(newInputGoals);
    }else{
      const newInputAssist = [...inputAssist]; // Hacer una copia del array
      newInputAssist.splice(index, 1); // Eliminar el elemento en el índice dado
      setInputAssist(newInputAssist);
    }
  }

  const inputHandler = (e,index) => {
    console.log("entre");
    const inputCopy = [...inputGoals]
    const inputAssistCopy = [...inputAssist]
    if(e.target.name === "goal"){
      const match = inputCopy.find(value => value.name === e.target.value)
      if(match){
        if(inputCopy[index].name){
          inputCopy[index].name = ""
        }
        e.target.value = "Gol de quien?"
        return swal("Ya agregaste a este jugador!")
      }
      inputCopy[index].name = e.target.value
      inputCopy[index].goals = 0
    }
    if(e.target.name === "goalsNumber"){
      inputCopy[index].goals =  e.target.value
    }
    if(e.target.name === "assist"){
      const match = inputAssist.find(value => value.name === e.target.value)
      if(match){
        if(inputAssist[index].name){
          inputAssist[index].name = ""
        }
        e.target.value = "Asistencia de quien?"
        return swal("Ya agregaste a este jugador!")
      }
      inputAssistCopy[index].name = e.target.value
      inputAssistCopy[index].assist = 0
    }
    if(e.target.name === "assistNumbers"){
      inputAssistCopy[index].assist =  e.target.value
    }
    setInputGoals(inputCopy)
    setInputAssist(inputAssistCopy)
  }

  const sendData = async(e) => {
    e.preventDefault()
    let playersToAdd = []
    const inputGoalsCopy = [...inputGoals]
    const inputAssistCopy = [...inputAssist]
    for (let i = 0; i < inputAssistCopy.length; i++) {
      const playerAssist = inputGoalsCopy.find(value => inputAssistCopy[i].name === value.name)
      if(!playerAssist){
        inputGoalsCopy.push({
          name: inputAssistCopy[i].name,
          goals:0,
          assist: inputAssistCopy[i].assist
        })
      }else{
        playersToAdd.push(inputAssistCopy[i])
      }
    }
    inputGoalsCopy.map(value => {
      if(!value.assist){
        const playerAssist = inputAssistCopy.find(player => player.name === value.name)
        if(!playerAssist){
          value.assist = 0
        }else{
          value.assist = playerAssist.assist
        }
      }
    })
    const winnerId = winner === data.FirstTeam.name ? data.FirstTeam.id : data.SecondTeam.name === winner ? data.SecondTeam.name : null
    const loserId = winner === data.SecondTeam.name ? data.SecondTeam.id : data.FirstTeam.name === winner ? data.FirstTeam.name : null
    const dataToSend = {allGoals: inputGoalsCopy, winner: winnerId, loser: loserId, firstTeamId: data.FirstTeam.id, secondTeamId: data.SecondTeam.id}
    await fetch("https://ligaapi.onrender.com/game/result", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          }).then(response => {if(response.ok){
            return response.json()
          }else{
            throw new Error("Algo salio mal")
          }}).then(async response => await swal({
            title: "Resultado definido!",
            text: "Si te equivocaste, deberas modificarlo manualmente en el panel de admin",
            icon: "success",})).then(response => setShow("none")).then(async response => 
              await fetch(`https://ligaapi.onrender.com/game/${data.id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })).then(response => window.location.reload())
            .catch(async err => await swal({
            title: "Algo salio mal...",
            text: `${err}`,
            icon: "error",}))
    }

  if(!data){
    return <p>Loading...</p>
  }

  console.log(inputGoals, inputAssist, winner);

    return(
        <div className={styles.clasification}>
        <div className={styles.clasificacionCard}>
          <button onClick={() => show === "none" ? setShow("block") : setShow("none")} className={styles.buttonAdmin}>Definir resultado</button>
          <div className={styles.adminPanel} style={{display:show}}>
          <button className={styles.close} name="newAssist" onClick={(e) => setShow("none")}>X</button>
            <div className={styles.winnerSelect}>
              <select className={styles.winner} onChange={(e) => setWinner(e.target.value)}>
                <option selected disabled>Elije un ganador</option>
                <option>{data.FirstTeam.name}</option>
                <option>{data.SecondTeam.name}</option>
                <option>Empate</option>
              </select>
            </div>
            <p className={styles.division}>Goles:</p>
            {inputGoals.map((value,index) => 
            <div className={styles.options}>
              <select name="goal" onChange={(e) => inputHandler(e, index)}>
                <option selected disabled>Gol de quien?</option>
                {firstTeamPlayers && firstTeamPlayers.length > 0 ? firstTeamPlayers.map(player => <option>{player.name}</option>) : null}
                {secondTeamPlayers && secondTeamPlayers.length > 0 ? secondTeamPlayers.map(player => <option>{player.name}</option>) : null}
              </select>
              <div className={styles.bottom}>
                <p>Cantidad de Goles:</p>
                <input value={inputGoals[index].goals} name="goalsNumber" onChange={(e) => inputHandler(e, index)} type="number"/>
                <button className={styles.close} name="newGoal" onClick={(e) => deleteInput(index, e)}>X</button>
              </div>
            </div>)
          }
          <p className={styles.division}>Asistencias:</p>
          {inputAssist.map((value,index) => 
            <div className={styles.options}>
              <select name="assist" onChange={(e) => inputHandler(e, index)}>
                <option selected disabled>Asistencia de quien?</option>
                {firstTeamPlayers && firstTeamPlayers.length > 0 ? firstTeamPlayers.map(player => <option>{player.name}</option>) : null}
                {secondTeamPlayers && secondTeamPlayers.length > 0 ? secondTeamPlayers.map(player => <option>{player.name}</option>) : null}
              </select>
              <div className={styles.bottom}>
                <p>Cantidad de Asistencias:</p>
                <input value={inputAssist[index].assist} name="assistNumbers" onChange={(e) => inputHandler(e, index)} type="number"/>
                <button className={styles.close} name="newAssist" onClick={(e) => deleteInput(index, e)}>X</button>
              </div>
            </div>)
          }
          <div className={styles.addButton}>
            <button name="newGoal" onClick={addInput}>Agregar otro gol</button>
            <button name="newAssist" onClick={addInput}>Agregar otra asistencia</button>
          </div>
          <div className={styles.sendDiv}>
            <button onClick={sendData} className={styles.send}>Definir Resultado</button>
          </div>
          </div>
          <div className={styles.teamInfo}>
            <img className={styles.teamPicture} src={data?.FirstTeam?.picture} />
            <p className={styles.teamName}>{data?.FirstTeam?.name}</p>
            <p className={styles.vs}>VS</p>
            <img className={styles.teamPicture} src={data?.SecondTeam?.picture} />
            <p className={styles.teamName}>{data?.SecondTeam?.name}</p>
          </div>
          <div className={styles.gameInfo}>
            <div>
              <img className={styles.icons} src="https://www.svgrepo.com/show/486593/clock.svg" />
              <p>{data.day}, {data.hour}</p>
            </div>
            <div>
              <img className={styles.icons} src="https://www.svgrepo.com/show/376955/map-marker.svg" />
              <p>{data.place}</p>
            </div>
          </div>
          <Link href={data.placeLink} className={styles.button}>Ver Mapa</Link>
        </div>
      </div>
    )
}

export default GamesCard