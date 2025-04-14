import { Stack, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import styles from './OrderComponent.module.css';
import Image from 'next/image';

import { useState, useCallback, useEffect } from 'react';

export default function OrderComponent() {
  const initialState = {
    name: "",
    ing: ["tomato sauce", "mozzarella"],
    status: "offen",
    dt0: null,
  };

  const [currentlySelected, setCurrentlySelected] = useState(initialState);

  const changeName = useCallback((input) => {
    setCurrentlySelected((prevState) => ({
      ...prevState,
      name: input
    }));
  }, []);

  const changeIngredients = useCallback((input, label) => {
    setCurrentlySelected((prevState) => {
      const newIngredients = input 
        ? [...prevState.ing, label]
        : prevState.ing.filter(item => item !== label);
      return {
        ...prevState,
        ing: newIngredients
      };
    });
  }, []);

  const handleButtonClick = async () => {
    setCurrentlySelected((prevState) => ({
      ...prevState,
      name: prevState.name.trim() === "" ? "Anonymous" : prevState.name,
      dt0: Date.now()
    }));

    const data = JSON.stringify({
      ...currentlySelected,
      name: currentlySelected.name.trim() === "" ? "Anonymous" : currentlySelected.name,
      dt0: Date.now()
    });

    try {
      const response = await fetch("http://localhost:3000/api/postPizza", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const jsonResponse = await response.json();

      alert("Thank you, your order was placed. You can follow the progress of your order on the right.");

      // Reset form to initial state
      setCurrentlySelected(initialState);

    } catch (error) {
      console.error("Fehler beim Senden der Daten", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };


  const toppings = [
    { name: "tomato sauce", disabled: true },
    { name: "mozzarella", disabled: false },
    { name: "basil", disabled: false },
    { name: "sun-dried tomatoes", disabled: false },
    { name: "eggplant", disabled: false },
    { name: "olives", disabled: false },
    { name: "paprika", disabled: false },
    { name: "artichokes", disabled: false },
    { name: "salami milano", disabled: false },
    { name: "salsiccia finocchino", disabled: false },
    { name: "chili oil", disabled: false },
  ]

  return (
    <div className={styles.OrderComponent}>
      <h1>Order your Pizza</h1>
      <Stack direction="row" spacing={2}>
        <h3>Toppings:</h3>
        <Stack spacing={2}>
          <FormGroup>
            {toppings.map((item, index) => (
              <FormControlLabel 
                control={
                  <Checkbox checked={currentlySelected.ing.includes(item["name"])} disabled={item["disabled"]} 
                  onChange={(event) => { changeIngredients(event.target.checked, item["name"]) }} />
                }
                label={item["name"]}
                key={index}
              />
              
            ))}
          </FormGroup>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2}>
        <h3>Name:</h3>
        <TextField 
          helperText="Please enter your name" 
          value={currentlySelected.name} 
          onChange={(event) => changeName(event.target.value)} 
        />
      </Stack>

      <hr className={styles.hr} />

      <Button variant='contained' onClick={handleButtonClick}>Place Order</Button>
    </div>
  );
}
