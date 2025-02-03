import { useState } from "react";

function Button({text, onButtonClick}) {
    
    return (
        <button className="toggle-button" onClick={onButtonClick}>
            {text}
        </button>
    );
}

export default Button;