import React, { useState, useEffect, useRef } from 'react';
import './GetName.css';

const GetName = () => {

    // Set up states
    const [name, setName] = useState('');
    const [nationality, setNationality] = useState(null);
    const inputRef = useRef();

    // useRef to create an auto-focused input
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // useEffect to make API GET requests whenever the name state changes
    useEffect(() => {
        const fetchData = () => {
        fetch(`https://api.nationalize.io/?name=${name}`)
            .then(response => response.json())
            .then(data => {
            const countryData = data.country[0];
            if (countryData) {
                // Destructuring the countryData object to 'set' the Nationality
                const { country_id, probability } = countryData;
                setNationality(`Country ID: ${country_id}, Probability: ${probability}`);
            } else {
                setNationality('No nationality data available');
            }
            })
            .catch(error => {
            console.error('Error fetching nationality data:', error);
            setNationality('Error fetching data');
            });
        };

        if (name) {
            fetchData();
        } else {
            setNationality(null);
        }
    }, [name]);

    // Function to handle the change in input
    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
        <h1>Nationality Predictor</h1>
        <label htmlFor="name" />
        <input
            ref={inputRef}
            id="name"
            type="text"
            value={name}
            placeholder="Enter name here..."
            onChange={handleChange}
        />
        <h2>{nationality || 'Enter a name to predict nationality'}</h2>
        </div>
    );
};

export default GetName;