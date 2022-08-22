import React from "react"

export default function Footer() {
    return(
        <div className = "footer-container">
            <div className = "footer-section">
                <img className = "footer-icon"  src={process.env.PUBLIC_URL + '/images/twitter.png'} alt = "Twitter" />
                <img className = "footer-icon" src={process.env.PUBLIC_URL + '/images/fb.png'} alt = "Facebook" />
                <img className = "footer-icon" src={process.env.PUBLIC_URL + '/images/ig.png'}  alt = "Instagram"/>
                <img className = "footer-icon" src={process.env.PUBLIC_URL + '/images/github.png'}  alt = "Github" />
            </div>
        </div>
    )
}
