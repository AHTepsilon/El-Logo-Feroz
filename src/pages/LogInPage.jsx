import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import Titles from '../specs/Titles'
import PageNumCounter from '../specs/PageNumCounter'
import TextBox from '../specs/TextBox'
import ChangePageButton from '../specs/ChangePageButton'
import CopyrightComponent from '../specs/CopyrightComponent'
import Slider from '../specs/Slider'
import CountryDropdown from 'country-dropdown-with-flags-for-react'; 
import './styles/LogInPage.scss'

function LogInPage() {
    return <>
        <div className='logo-div'>

        </div>
        <div className='central-area-div'>
            <Titles className='title' text="YA CASI ESTÁS LISTO PARA COMENZAR"></Titles>
        </div>
        <div className='central-area-div-textbox'>
            <h4 className='central-area-div-textbox-title-loginpage'>EL LOGO FEROZ! NECESITA SABER TU PAÍS Y NÚMERO DE CELULAR. INICIA SESIÓN CON ALGÚN MÉTODO Y ESTARÁS DENTRO :)</h4>
            <div className="central-area-div-textbox-input-div">
                <CountryDropdown  id="UNIQUE_ID" className='central-area-div-textbox-input-div-country' preferredCountries={['co', 'us']}  value="" ></CountryDropdown>
                <input type="text" className="central-area-div-textbox-input-div-input"></input>
            </div>
            <div className='central-area-div-textbox-buttons'>
                <div className='central-area-div-textbox-buttons-google-div'>
                    <Link to='/FirstPage'><button className='central-area-div-textbox-buttons-google-div-button'>Continuar con Google</button></Link>
                </div>
                <div className='central-area-div-textbox-buttons-meta-div'>
                    <Link to='/FirstPage'><button className='central-area-div-textbox-buttons-meta-div-button'>Continuar con Meta</button></Link>
                </div>
            </div>
            <div className = "central-area-div-textbox-checkBox-div">
                <input className = "central-area-div-textbox-checkBox-div-input" type='checkbox'></input> <p className = "central-area-div-textbox-checkBox-div-text">ACEPTO LOS TÉRMINOS Y CONDICIONES DEL SERVICIO Y LA POLÍTICA DE PRIVACIDAD DE EL LOGO FEROZ!</p>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
            </div>
        </div>
    </>
}

export default LogInPage;