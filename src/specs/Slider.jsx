import React from 'react';
import './styles/Slider.scss'

function Slider({lowText, highText}) {
    return <div className="slider-item">
        <p className="slider-item-text slider-item-text-low">{lowText}</p>
            <input class="slider-item-range" type='range'></input>
        <p className="slider-item-text slider-item-text-high">{highText}</p>
    </div>
}

export default Slider;