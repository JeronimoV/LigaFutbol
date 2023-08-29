"use client"
import GamesCard from "@/components/gamesCard/gamesCard"
import { useState, useEffect } from "react"

const MatchPanel = () => {

    const [allMatchs, setAllMatchs] = useState(null)

    const getMatchs = async() => {
        await fetch("https://ligaapi.onrender.com/game").then(response => response.json()).then(response => response.sort((a,b) => {if(a.points > b.points){return -1}else{return 1}})).then(response => setAllMatchs(response))
      }

      useEffect(() => {
        getMatchs()
      }, [])

      if(!allMatchs){
        getMatchs()
      }

      console.log(allMatchs);

    return(
        <div>
            {allMatchs && allMatchs.length > 0 ? allMatchs.map((value) => <GamesCard data={value}/>) : null}
        </div>
    )
}

export default MatchPanel