import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handleChange=(type)=> {
    setFilters({ type: type });
  }

  const handleFindPets=()=> {
    let url = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((petsArray) => {
        setPets(petsArray);
      });
  }

  const handleAdoptPet=(id)=> {
    const updatedPets = pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChange}
              onPetsClick={handleFindPets}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;