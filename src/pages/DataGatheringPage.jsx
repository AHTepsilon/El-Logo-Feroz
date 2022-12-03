import React, {useState} from 'react';
import {OptionsSelector1, OptionsSelector2, OptionsSelector3, OptionsSelector4, OptionsSelector5, OptionsSelector6} from '../specs/OptionsSelector'
import ChangePageButton from '../specs/ChangePageButton'
import PersonalDataFormComponent from '../components/PersonalDataFormComponent'
import BriefingFormComponent from '../components/BriefingFormComponent'
import './styles/DataGatheringPage.scss'

function ToggleOthers(exclude){
    switch(exclude){
        case 'data':
            setIsDataFormVisible(!isDataFormVisible);
            setIsBriefingFormVisible(false);
        case 'briefing':
            setIsBriefingFormVisible(!isBriefingFormVisible);
            setIsDataFormVisible(false);
    }
}

function DataGatheringPage() {

    const [isDataFormVisible, setIsDataFormVisible] = useState(false)
    const [isBriefingFormVisible, setIsBriefingFormVisible] = useState(false)

    return <>
        <header>
            <div className='logo-div'>

            </div>
            <div className ='user-div'>

            </div>
        </header>
        <section>
            <div className='section-select-div'>
                <select className='section-select-div-select'></select>
            </div>
            <div className='section-options-grid'>
                <div className='section-options-grid-gridarea'>
                    <div onClick={() => {            setIsDataFormVisible(!isDataFormVisible);
            setIsBriefingFormVisible(false);}}><OptionsSelector1 className='section-options-grid-option' lowValue1 = '9' highValue1 = '0'  text='DATOS PERSONALES'/></div>
                    <div onClick={() => {            setIsBriefingFormVisible(!isBriefingFormVisible);
            setIsDataFormVisible(false);}}><OptionsSelector2 className='section-options-grid-option' lowValue2 = '10' highValue2 = '0' text='BRIEFING'/></div>
                    <OptionsSelector3 className='section-options-grid-option' lowValue3 = '7' highValue3 = '0' text='ESTILO'/>
                    <OptionsSelector4 className='section-options-grid-option' lowValue4 = '3' highValue4 = '0' text='EJEMPLOS'/>
                    <OptionsSelector5 className='section-options-grid-option' lowValue5 = '2' highValue5 = '0' text='PLAN'/>
                    <OptionsSelector6 className='section-options-grid-option' lowValue6 = '1' highValue6 = '0' text='MÉTODO DE PAGO'/>
                </div>
            </div>
            <div className='section-button'>
                <ChangePageButton className='section-button-butt' text='PONTE MANOS A LA OBRA, LOGO FEROZ!'/>
            </div>
        </section>
        {
            isDataFormVisible ? <PersonalDataFormComponent className='PersonalDataPopUp'></PersonalDataFormComponent> : <div></div>
        }
        {
            isBriefingFormVisible ? <BriefingFormComponent className='BriefingPopUp'></BriefingFormComponent> : <div></div>
        }
    </>
}

export default DataGatheringPage;