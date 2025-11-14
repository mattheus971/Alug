import React from 'react'
import './InputPadrao.css'

function InputPadrao({ label, placeholder, type = "text", value }) {
    return (
        <div className='container-input'>
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