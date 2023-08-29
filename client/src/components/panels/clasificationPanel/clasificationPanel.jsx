"use client"
import ClasificationCard from "@/components/clasificationCard/clasificationCard"

const { useState, useEffect } = require("react")

const ClasificationPanel = () => {

    const [allTeams, setAllTeams] = useState(null)

    const getTeams = async() => {
        await fetch("http://localhost:3001/team").then(response => response.json()).then(response => response.sort((a,b) => {if(a.points > b.points){return -1}else{return 1}})).then(response => setAllTeams(response))
      }

      useEffect(() => {
        getTeams()
      }, [])

      if(!allTeams){
        getTeams()
      }

      console.log(allTeams);

    return(
        <div>
            {allTeams && allTeams.length > 0 ? allTeams.map((value, index) => <ClasificationCard data={value} position={index + 1 + "°"} />) : null}
        </div>
    )
}

export default ClasificationPanel