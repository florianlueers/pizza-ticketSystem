import React from "react";
import { Stack, Button, keyframes } from "@mui/material";


const PizzaComponent = (pizza) => {

    async function sendData(data) {
        try {
            const response = await fetch("http://localhost:3000/api/updatePizza", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }

            const jsonResponse = await response.json()
            console.log(jsonResponse)
        } catch (error) {
            console.error("Fehler beim Senden der Daten", error)
        }
    }


    async function increaseStatus()  {
        const stati = ["offen", "being prepared", "cooking", "available"]

        if (status === "offen") {
            var neuerStatus = "being prepared"
            let newData = {name: name, ing: ingredients, status: neuerStatus}
            newData.dt1 = Date.now()
            const data = JSON.stringify(newData)

            sendData(data)
        }
        
        if (status === "being prepared") {
            var neuerStatus = "cooking"
            let newData = {name: name, ing: ingredients, status: neuerStatus}
            newData.dt2 = Date.now()
            const data = JSON.stringify(newData)

            sendData(data)
        }

        if (status === "cooking") {
            var neuerStatus = "available"
            let newData = {name: name, ing: ingredients, status: neuerStatus}
            newData.dt3 = Date.now()
            const data = JSON.stringify(newData)

            sendData(data)
        }

        if (status === "available") {
            var neuerStatus = "done"
            let newData = {name: name, ing: ingredients, status: neuerStatus}
            newData.dt4 = Date.now()
            const data = JSON.stringify(newData)

            sendData(data)
        }
        
        
    }

    const object = pizza.pizza

    const name = object.name
    const ingredients = object.ing
    var status = object.status
    

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => increaseStatus()}>next</Button>
                <div style={{width: "150px", fontWeight: "bold",fontSize: "20px"}}>{status}</div>
                <div style={{width: "150px", fontWeight: "bold",fontSize: "20px"}}>{name}</div>
                <p style={{fontSize: "20px"}}>{ingredients.join(", ")}</p>
            </Stack>
            <hr />
        </>
    )
}

export default PizzaComponent