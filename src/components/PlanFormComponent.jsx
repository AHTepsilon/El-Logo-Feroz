import React from 'react'
import './styles/PlanFormComponent.scss';

function PlanFormComponent(){
    return <form className='form'>
        <div className='form-title'>
            <h3 className='form-title-title'>ELIGE TU PLAN</h3>
        </div>
        <div className='form-div form-design-type'>
            <h4 className='form-div-title'>TIPO DE DISEÑO</h4>
            <div className='form-div-inner'>
                <div className='form-div-inner-div'>
                    <button className='form-div-inner-div-button'>RÁPIDO</button>
                    <p className='form-div-inner-div-p'>VER EJEMPLOS</p>
                </div>
                <div className='form-div-inner-div'>
                    <button className='form-div-inner-div-button'>A MEDIDA</button>
                    <p className='form-div-inner-div-p'>VER EJEMPLOS</p>
                </div>
            </div>
        </div>
        <div className='form-div form-size-plan'>
            <h4 className='form-div-title'>TAMAÑO DE PLAN</h4>
            <div className='form-div-inner'>
                <div className='form-div-inner-div'>
                    <button className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>LOGO</p>
                </div>
                <div className='form-div-inner-div'>
                    <button className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>LOGO + PIEZAS</p>
                </div>
                <div className='form-div-inner-div'>
                    <button className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>COMPLETO</p>
                </div>
            </div>
        </div>
        <div className='form-div form-size-questions'>
            <div className='form-div-inner form-size-questions-inner'>
                <div className='form-div-inner-div form-size-questions-inner-div'>
                    <h4 className='form-div-inner-div-title  form-size-questions-inner-div-title'>TENGO UN CÓDIGO PROMOCIONAL</h4>
                    <input type='text' className='form-div-inner-div-input  form-size-questions-inner-div-text'></input>
                </div>
                <div className='form-div-inner-div  form-size-questions-inner-div'>
                    <h4 className='form-div-inner-div-title  form-size-questions-inner-div-title'>SOY SIN ÁNIMO DE LUCRO</h4>
                    <input type='checkbox' className='form-div-inner-div-input   form-size-questions-inner-div-check'></input>
                </div>
            </div>
        </div>
    </form>
}

export default PlanFormComponent;