import React from 'react'
import './styles/ChangePageButton.scss'

function ChangePageButton({text, clickEvent}) {
    return <button className='next-button' onClick={clickEvent}>{text}</button>
}

export default ChangePageButton;