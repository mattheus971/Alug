import React from 'react'

function InputPadrao({ label, placeholder, type = "text", value }) {
    return (
        <div>
            {label && <label>{label}</label>}
            <input
            placeholder={placeholder}
            type={type}
            value={value}
            />
        </div>
    )
}

export default InputPadrao