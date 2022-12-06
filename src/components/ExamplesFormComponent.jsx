import React, {Component} from 'react';
import './styles/ExamplesFormComponent.scss'

export default class ExamplesFormComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return <form className='form'>
        <div className = 'form-title'>
            <h4 className='form-title-main'>LE AYUDARÍAS MUCHO A EL LOGO FEROZ! SI SUBES 3 LOGOS QUE TE GUSTEN MUCHO</h4>
            <p className='form-title-secondary'>NO ES NECESARIO QUE SEAN DEL MISMO SECTOR ECONÓMICO, SON SÓLO REFERENCIAS PARA SABER QUÉ CAMINO TOMAR</p>
        </div>
        <div className='form-chooselogo'>
            <div className='form-chooselogo-select form-chooselogo-select-first'>
                <h4 className='form-chooselogo-select-title form-chooselogo-select-title-first'>LOGO 1</h4>
                <input className='form-chooselogo-select-input form-chooselogo-select-input-first' type='file'></input>
                <p className='form-chooselogo-select-p form-chooselogo-select-p-first'>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea className='form-chooselogo-select-textarea form-chooselogo-select-textarea-first'></textarea>
            </div>
            <div className='form-chooselogo-select form-chooselogo-select-second'>
                <h4 className='form-chooselogo-select-title form-chooselogo-select-title-second'>LOGO 2</h4>
                <input className='form-chooselogo-select-input form-chooselogo-select-input-second'  type='file'></input>
                <p className='form-chooselogo-select-p form-chooselogo-select-p-second'>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea className='form-chooselogo-select-textarea form-chooselogo-select-textarea-second'></textarea>
            </div>
            <div>
                <h4 className='form-chooselogo-select-title form-chooselogo-select-title-third'>LOGO 3</h4>
                <input className='form-chooselogo-select-input form-chooselogo-select-input-third' type='file'></input>
                <p className='form-chooselogo-select-p form-chooselogo-select-p-third'>DIME ALGO DE ESE LOGO (OPCIONAL)</p>
                <textarea className='form-chooselogo-select-textarea form-chooselogo-select-textarea-third'></textarea>
            </div>
        </div>
    </form>
    }
}