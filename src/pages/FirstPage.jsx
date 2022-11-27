import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
import SecondPage from './SecondPage'
import Titles from '../specs/Titles'
import PageNumCounter from '../specs/PageNumCounter'
import TextBox from '../specs/TextBox'
import ChangePageButton from '../specs/ChangePageButton'
import CopyrightComponent from '../specs/CopyrightComponent'
import './styles/FirstPage.scss'

function FirstPage(){
    return <>
        <div className='logo-div'>

        </div>
        <div className='central-area-div'>
            <div className='central-area-div-titles'>
                <Titles className='title' text="PRIMERO UNAS SENCILLAS PREGUNTAS :)"></Titles>
                <PageNumCounter className='page-counter' pageNum='1'></PageNumCounter>
            </div>
            <div className='central-area-div-textbox'>
                <TextBox className='text-box' title='NOMBRE DE TU EMPRENDIMIENTO' placeholder='Mundo Interesante'></TextBox>
                    <Link to='/SecondPage'><ChangePageButton text='SIGUIENTE'></ChangePageButton></Link>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
            </div>
        </div>
        </>
}

export default FirstPage;