"use client"
import PlayerCard from "@/components/playerCard/playerCard"

const { useState, useEffect } = require("react")

const PlayersPanel = () => {

    const [allPlayers, setAllPlayers] = useState(null)

    const getPlayers = async() => {
        await fetch("https://ligaapi.onrender.com/player").then(response => response.json()).then(response => response.sort((a,b) => {if((a.goals*2 + a.assist) > b.goals*2 + b.assist){return -1}else{return 1}})).then(response => setAllPlayers(response))
      }

      useEffect(() => {
        getPlayers()
      }, [])

      if(!allPlayers){
        getPlayers()
      }

      (allPlayers);

    return(
        <div>
          
            {allPlayers && allPlayers.length > 0 ? allPlayers.map((value, index) => <PlayerCard data={value} position={index + 1 + "°"} />) : null}
        </div>
    )
}

export default PlayersPanel