import React from "react"

export default function Info() {
    return(
        <div className = "info-section">
            <img className = "photo" src={process.env.PUBLIC_URL + '/images/profile.png'}  alt = "Profile"/>
            <h1>Laura Smith</h1> 
            <h3>Frontend Developer</h3>
            <h6>laurasmith.website</h6>
            <div className = "button-container">
                <div className = "button1">
                    <img src={process.env.PUBLIC_URL + '/images/mail.png'}  alt = "Mail" width="16" height="16" />
                    <h3>Email</h3>
                </div>
                <div className = "button2">
                    <img src={process.env.PUBLIC_URL + '/images/linkedin.png'}  alt = "Linkedin" width="16" height="16" />
                    <h3>LinkedIn</h3>
                </div>
            </div>
        </div>
    )
}