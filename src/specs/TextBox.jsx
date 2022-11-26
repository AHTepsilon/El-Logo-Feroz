import React from 'react'
import './styles/TextBox.scss'

function TextBox({title, placeholder}){
    return <div className="TextBox-div">
        <h4 className='tertiary-title'>{title}</h4>
        <input className='input-box' type="text" placeholder={placeholder}></input>
        <button className='next-button'>SIGUIENTE</button>
    </div>
}

export default TextBox