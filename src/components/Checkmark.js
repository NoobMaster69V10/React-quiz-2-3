import React, { useState } from 'react';
import '../App.css';

function Checkmark(item) {
    const [checked, setChecked] = useState(false);


    return (
        <input
            type="checkbox"
            id="checkmark"
            checked={checked}
            onChange={() => {
                setChecked(!checked);
                console.log(item);
            }}
        />
    );
}

export default Checkmark;