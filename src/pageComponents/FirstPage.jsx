import React from 'react';
import Titles from '../specs/Titles'
import PageNumCounter from '../specs/PageNumCounter'
import TextBox from '../specs/TextBox'
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
            </div>
        </div>
        <div className='copyright-area-div'>

        </div>
        </>
}

export default FirstPage;