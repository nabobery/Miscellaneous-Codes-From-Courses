import React from "react"

export default function Item(props){
    //console.log(props)
    return(
        <div className = "journal-item">
            <img className = "journal--img" src = {props.data.imageUrl} alt = "The Location"/>
            <div className = "journal-description"> 
                <div className = "journal-location">
                    <img className = "location-logo" src = {process.env.PUBLIC_URL + '/images/location.png'} alt = "Location" />
                    <h1>{props.data.location.toUpperCase()}</h1>
                    <a href = {props.data.googleMapsUrl} >View on Google Maps</a>
                </div>
                <h1>{props.data.title}</h1>
                <h3>{props.data.startDate} - {props.data.endDate}</h3>
                <p>{props.data.description}</p>
            </div>
        </div>
    )
}