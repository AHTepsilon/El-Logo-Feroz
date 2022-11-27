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
import './styles/ThirdPage.scss'

function ThirdPage() {
    return <>
        <div className='logo-div'>

        </div>
        <div className='central-area-div'>
            <Titles className='title' text=""></Titles>
                <PageNumCounter className='page-counter' pageNum='3'></PageNumCounter>
        </div>
        <div className='central-area-div-textbox'>
            <h4 className='tertiary-title'>¿CÓMO TE GUSTARÍA QUE PERCIBIERAN TU MARCA?</h4>
            <Slider lowText = 'AMABLE' highText = 'AUTORITARIA'></Slider>
            <Slider lowText = 'INNOVADORA' highText = 'CLÁSICA'></Slider>
            <Slider lowText = 'CREATIVA' highText = 'SERIA'></Slider>
            <Slider lowText = 'MASIVA' highText = 'EXCLUSIVA'></Slider>
            <Slider lowText = 'CONVENCIONAL' highText = 'REBELDE'></Slider>
            <Link to='/LogInPage'><ChangePageButton text='SIGUIENTE'></ChangePageButton></Link>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
        </div>
    </>
}

export default ThirdPage;