import React from 'react'
import './styles/PersonalDataFormComponent.scss'

function PersonalDataFormComponent() {
    return <form className='form'>
        <div className='form-main-div'>
            <div className='form-firstColumn'>
                <div className='form-firstColumn-name'>
                    <h4 className='form-firstColumn-name-title'>TU NOMBRE REAL</h4>
                    <input type='text' className='form-firstColumn-name-text form-firstColumn-name-text-name'></input>
                </div>
                <div className='form-firstColumn-email'>
                    <h4 className='form-firstColumn-email-title'>TU CORREO</h4>
                    <input type='email' className='form-firstColumn-name-text form-firstColumn-name-text-name'></input>
                </div>
                <div className='form-firstColumn-checkboxes'>
                    <div className='form-firstColumn-checkboxes-first'>
                        <input type='checkbox' className='form-firstColumn-checkboxes-first-check'></input>
                        <p className='form-firstColumn-checkboxes-first-p'>ACEPTO QUE EL LOGO FEROZ! ME ENVÍE CONTENIDO INTERESANTE VÍA CORREO</p>
                    </div>
                    <div className='form-firstColumn-checkboxes-second'>
                        <input type='checkbox' className='form-firstColumn-checkboxes-second-check'></input>
                        <p className='form-firstColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES DEL PROCESO CON EL LOGO FEROZ! VÍA CORREO</p>
                    </div>
                </div>
            </div>
            <div className='form-secondColumn'>
                <div className='form-secondColumn-phone'>
                    <h4 className='form-secondColumn-name-title'>TU CELULAR</h4>
                    <input type='text' className='form-secondColumn-name-text form-secondColumn-name-text-name'></input>
                </div>
                <div className='form-secondColumn-checkboxes'>
                    <div className='form-secondColumn-checkboxes-second'>
                        <input type='checkbox' className='form-secondColumn-checkboxes-second-check'></input>
                        <p className='form-secondColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES VÍA WHATSAPP DEL PROCESO CON EL LOGO FEROZ!</p>
                    </div>
                    <div className='form-secondColumn-checkboxes-second'>
                        <input type='checkbox' className='form-secondColumn-checkboxes-second-check'></input>
                        <p className='form-secondColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES VÍA SMS DEL PROCESO CON EL LOGO FEROZ!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='form-lowercheckbox'>
            <input type='checkbox' className='form-lowercheckbox-checkbox'></input>
            <p className='form-lowercheckbox-p'>LEÍ Y COMPRENDÍ PERFECTAMENTE LA METODOLOGÍA DEL LOGO FEROZ! Y POR ESO ACEPTO ESTE PROYECTO Y SUS PROCEDIMIENTOS DESCRITOS AQUÍ</p> 
        </div>

    </form>
}

export default PersonalDataFormComponent