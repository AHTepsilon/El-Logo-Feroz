import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    Navigate,
    redirect
  } from "react-router-dom";
import SecondPage from './SecondPage'
import Titles from '../specs/Titles'
import PageNumCounter from '../specs/PageNumCounter'
import TextBox from '../specs/TextBox'
import ChangePageButton from '../specs/ChangePageButton'
import CopyrightComponent from '../specs/CopyrightComponent'
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import './styles/FirstPage.scss'

export default class FirstPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            businessName: '',
        }
    }

    updateAnswers(businessName){
        const user = {
            'nombreEmprendimiento': businessName
        }

        if (this.state.businessName != ''){
            updateUserData(user).then(() => {
                window.location.href = '/SecondPage'
            })
        }
        else{
            alert('Por favor llena todos los campos antes de continuar')
        }
    }

    render(){
        return <>
        <div className='logo-div'>

        </div>
        <div className='central-area-div'>
            <div className='central-area-div-titles'>
                <Titles className='title' text="PRIMERO UNAS SENCILLAS PREGUNTAS :)"></Titles>
                <PageNumCounter className='page-counter' pageNum='1'></PageNumCounter>
            </div>
            <div className='central-area-div-textbox'>
                <TextBox val={this.state.businessName} changeEvent={(e) => {this.setState({businessName: e.target.value})}} className='text-box' title='NOMBRE DE TU EMPRENDIMIENTO' placeholder='Mundo Interesante'></TextBox>
                <ChangePageButton text='SIGUIENTE' clickEvent={() => {this.updateAnswers(this.state.businessName)}}></ChangePageButton>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
            </div>
        </div>
        </>
    }
}