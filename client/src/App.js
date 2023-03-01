import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  let [cities, setCities] = useState([]);
  let [students, setStudents] = useState([]);

  let getCities = async () => {
    let response = await axios.get("/citiesOfIndia");

    setCities(response.data);
    console.log(response);
  };

  let getUsersFromAtlas = async () => {
    let response = await axios.get("/getUsers");

    setStudents(response.data);

    console.log(response);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          getCities();
        }}
      >
        Get Cities
      </button>

      <button
        onClick={() => {
          getUsersFromAtlas();
        }}
      >
        Get Users
      </button>
      {cities.map((city) => {
        return <h2>{city}</h2>;
      })}
      {students.map((student) => {
        return <h2>{student.name}</h2>;
      })}
    </div>
  );
}

export default App;
