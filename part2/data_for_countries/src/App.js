import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Country from './Country';

const App = () => {
    const [input, setInput] = useState('')
    const [countries, setCountries] = useState([])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then((response) => {
                setCountries(response.data.filter((country) => country.name.toLowerCase().indexOf(input) !== -1))
            })
    }, [input])

    const handleClick = (country) => {
        setCountries([country]);
    }
    return (
        <div className="App">
            <label>find countries</label>
            <input type="text" name="country" onChange={handleChange}></input>
            {countries.length < 10 && countries.length > 1 &&
            <ul>{countries.map((country) => {
                return (
                    <div key={country.name}>
                        <li key={country.name}>{country.name}</li>
                        <button onClick={() => handleClick(country)}>Show</button>
                    </div>
                )
            })}</ul>}
            {countries.length >= 10 && <p>Too many results</p>}
            {countries.length === 1 && 
                <Country data={countries[0]}/>
            }

        </div>
    );
}

export default App;
