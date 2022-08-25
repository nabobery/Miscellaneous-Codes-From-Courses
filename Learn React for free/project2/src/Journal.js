import React from "react"
import data from "./data"
import Item from "./Item"

export default function Journal(){
    let items = data.map(item => {
        return <Item  
            key={item.title}
            data={item}
        />
    })
    return(
        <section className = "journal-list" >
            {items} 
        </section>
    )
}