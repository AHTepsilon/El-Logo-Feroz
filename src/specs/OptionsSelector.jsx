import React from 'react';
import LinearProgressBar from './LinearProgressBar.jsx'
import './styles/OptionsSelector.scss'

export function OptionsSelector1({text, lowValue1, highValue1}) {

    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue1} completedAmount={highValue1}></LinearProgressBar>
    </div>
}

export function OptionsSelector2({text, lowValue2, highValue2}) {
    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue2} completedAmount={highValue2}></LinearProgressBar>
    </div>
}

export function OptionsSelector3({text, lowValue3, highValue3}) {
    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue3} completedAmount={highValue3}></LinearProgressBar>
    </div>
}

export function OptionsSelector4({text, lowValue4, highValue4}) {
    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue4} completedAmount={highValue4}></LinearProgressBar>
    </div>
}

export function OptionsSelector5({text, lowValue5, highValue5}) {
    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue5} completedAmount={highValue5}></LinearProgressBar>
    </div>
}

export function OptionsSelector6({text, lowValue6, highValue6}) {
    return <div className='options-selector-div'>
        <h3 className='options-title'>{text}</h3>
        <LinearProgressBar className='linear-progress-bar' optionsQuantity={lowValue6} completedAmount={highValue6}></LinearProgressBar>
    </div>
}