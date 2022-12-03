import React from 'react'
import './styles/StyleFormComponent.scss'
import Slider from '../specs/Slider'

function StyleFormComponent() {
    return <form className='form'>
        <div className='form-sliders'>
            <Slider lowText = 'AMABLE' highText = 'AUTORITARIA'></Slider>
            <Slider lowText = 'INNOVADORA' highText = 'CLÁSICA'></Slider>
            <Slider lowText = 'CREATIVA' highText = 'SERIA'></Slider>
            <Slider lowText = 'MASIVA' highText = 'EXCLUSIVA'></Slider>
            <Slider lowText = 'CONVENCIONAL' highText = 'REBELDE'></Slider>
        </div>
        <div className='form-type'>
            <div><h4 className='form-type-title'>TIPO DE LOGOTIPO</h4></div>
            <div className='form-type-checkboxes'>
                <div className='form-type-checkboxes-typography form-div'>
                    <h4 className='form-type-checkboxes-typography-title'>SOLO TIPOGRAFÍA</h4>
                    <input type='checkbox'  className='form-type-checkboxes-typography-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-with form-div'>
                    <h4 className='form-type-checkboxes-symbol-with-title'>CON SÍMBOLO</h4>
                    <input type='checkbox'  className='form-type-checkboxes-symbol-with-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-alone form-div'>
                    <h4 className='form-type-checkboxes-symbol-alone-title'>SOLO SÍMBOLO</h4>
                    <input type='checkbox'  className='form-type-checkboxes-symbol-alone-check'></input>
                </div>                
            </div>
        </div>
        <div className='form-type-writing'>
            <h4 className='form-type-title'>¿TIENES PREFERENCIA POR EL TIPO DE LETRA?</h4>
            <div className='form-type-checkboxes'>
                <div className='form-type-checkboxes-typography form-div'>
                    <h4 className='form-type-checkboxes-typography-title'>SANS SERIF</h4>
                    <input type='checkbox'  className='form-type-checkboxes-typography-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-with form-div'>
                    <h4 className='form-type-checkboxes-symbol-with-title'>SERIF</h4>
                    <input type='checkbox'  className='form-type-checkboxes-symbol-with-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-alone form-div'>
                    <h4 className='form-type-checkboxes-symbol-alone-title'>MANUSCRITA</h4>
                    <input type='checkbox'  className='form-type-checkboxes-symbol-alone-check'></input>
                </div>                
            </div>
        </div>

    </form>
}

export default StyleFormComponent;