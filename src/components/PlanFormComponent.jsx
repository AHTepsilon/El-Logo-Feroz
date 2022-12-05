import React, { Component } from 'react'
import './styles/PlanFormComponent.scss';
import ChangePageButton from '../specs/ChangePageButton'
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'

export default class PlanFormComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            disenoTipo: '',
            planSize: '',
            promoCode: '',
            sinAnimoDeLucro: false,
        }
    }

    updateAnswers(){
        const user = {
            'disenoTipo': this.state.disenoTipo,
            'planSize': this.state.planSize,
            'promoCode': this.state.promoCode,
            'sinAnimoDeLucro': this.state.sinAnimoDeLucro,
        }
        
        updateUserData(user).then(() => {
            alert('Información guardada con éxito :)')
        })
    }

    render(){
        return <form className='form'>
        <div className='form-title'>
            <h3 className='form-title-title'>ELIGE TU PLAN</h3>
        </div>
        <div className='form-div form-design-type'>
            <h4 className='form-div-title'>TIPO DE DISEÑO</h4>
            <div className='form-div-inner'>
                <div className='form-div-inner-div'>
                    <button onClick = {(e) => {e.preventDefault(); this.setState({disenoTipo:'rapido'})}} className='form-div-inner-div-button'>RÁPIDO</button>
                    <p className='form-div-inner-div-p'>VER EJEMPLOS</p>
                </div>
                <div className='form-div-inner-div'>
                    <button onClick = {(e) => {e.preventDefault(); this.setState({disenoTipo:'a medida'})}} className='form-div-inner-div-button'>A MEDIDA</button>
                    <p className='form-div-inner-div-p'>VER EJEMPLOS</p>
                </div>
            </div>
        </div>
        <div className='form-div form-size-plan'>
            <h4 className='form-div-title'>TAMAÑO DE PLAN</h4>
            <div className='form-div-inner'>
                <div className='form-div-inner-div'>
                    <button onClick = {(e) => {e.preventDefault(); this.setState({planSize:'logo'})}} className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>LOGO</p>
                </div>
                <div className='form-div-inner-div'>
                    <button onClick = {(e) => {e.preventDefault(); this.setState({planSize:'logoPiezas'})}} className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>LOGO + PIEZAS</p>
                </div>
                <div className='form-div-inner-div'>
                    <button onClick = {(e) => {e.preventDefault(); this.setState({planSize:'completo'})}} className='form-div-inner-div-button-2'></button>
                    <p className='form-div-inner-div-p-2'>COMPLETO</p>
                </div>
            </div>
        </div>
        <div className='form-div form-size-questions'>
            <div className='form-div-inner form-size-questions-inner'>
                <div className='form-div-inner-div form-size-questions-inner-div'>
                    <h4 className='form-div-inner-div-title  form-size-questions-inner-div-title'>TENGO UN CÓDIGO PROMOCIONAL</h4>
                    <input value={this.state.email} onChange={(e) => {this.setState({promoCode: e.target.value})}} type='text' className='form-div-inner-div-input  form-size-questions-inner-div-text'></input>
                </div>
                <div className='form-div-inner-div  form-size-questions-inner-div'>
                    <h4 className='form-div-inner-div-title  form-size-questions-inner-div-title'>SOY SIN ÁNIMO DE LUCRO</h4>
                    <input onClick = {(e) => {this.setState({sinAnimoDeLucro: e.target.checked})}} type='checkbox' className='form-div-inner-div-input   form-size-questions-inner-div-check'></input>
                </div>
            </div>
        </div>
        <div>
            <ChangePageButton text='GUARDAR' clickEvent={(e) => {e.preventDefault(); this.updateAnswers()}}></ChangePageButton>
        </div>
    </form>
    }
}