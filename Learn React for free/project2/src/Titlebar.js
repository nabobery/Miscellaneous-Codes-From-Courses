import React from "react"

export default function Titlebar(){
    return(
        <div className = "title-bar">
            <img className = "title--logo" src = {process.env.PUBLIC_URL + '/images/title-logo.png'} alt = "Title Logo"/>
            <h1 className = "title--text" >my travel journal.</h1>
        </div>
    )
}