import React, { useState } from 'react';
import '../App.css';

function Dropdown() {
    const [selectedOption, setSelectedOption] = useState('All');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="note_filter">
            <select
                className="dropdown"
                value={selectedOption}
                onChange={handleChange}
            >
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
            </select>
        </div>
    );
}

export default Dropdown;