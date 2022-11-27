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
        </div>
    </>
}

export default LogInPage;