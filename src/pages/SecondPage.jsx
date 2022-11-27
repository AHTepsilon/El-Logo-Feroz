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
import './styles/SecondPage.scss'

function SecondPage() {
    return <>
        <div className='logo-div'>

        </div>
        <div className='central-area-div'>
            <Titles className='title' text=""></Titles>
                <PageNumCounter className='page-counter' pageNum='2'></PageNumCounter>
        </div>
        <div className='central-area-div-textbox'>
                <TextBox className='text-box' title='¿A QUÉ SECTOR ECONOMICO PERTENECE TU EMPRENDIMIENTO?' placeholder='Perfil Instagram'></TextBox>
                    <Link to='/ThirdPage'><ChangePageButton text='SIGUIENTE'></ChangePageButton></Link>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
        </div>
    </>
}

export default SecondPage;