import React from 'react'
import './styles/TextBox.scss'

function TextBox({title, placeholder, val, changeEvent}){
    return <div className="TextBox-div">
        <h4 className='tertiary-title'>{title}</h4>
        <input className='input-box' type="text" placeholder={placeholder} value={val} onChange={changeEvent}></input>
    </div>
}

export default TextBox