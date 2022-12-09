import React, {Component} from 'react';
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
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import './styles/SecondPage.scss'

export default class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            economicSector: '',
        }
    }

    async componentDidMount(){
        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
                    if(docSnap.exists()){
                        this.setState({economicSector: docSnap.data().sectorEconomico})
                    }
                    else{
                        this.setState({economicSector: ''})
                    }
                })
              }
              catch(error){
                console.log(error);
                window.location.reload(false);
              }
        }, 1000);
    }

    updateAnswers(economicSector){
        const user = {
            'sectorEconomico': economicSector
        }

        if (this.state.economicSector != ''){
            updateUserData(user).then(() => {
                window.top.location = '/ThirdPage'
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
            <Titles className='title' text=""></Titles>
                <PageNumCounter className='page-counter' pageNum='2'></PageNumCounter>
        </div>
        <div className='central-area-div-textbox'>
                <TextBox val={this.state.economicSector} changeEvent={(e) => {this.setState({economicSector: e.target.value})}} className='text-box' title='¿A QUÉ SECTOR ECONOMICO PERTENECE TU EMPRENDIMIENTO?' placeholder='Perfil Instagram'></TextBox>
                <ChangePageButton text='SIGUIENTE' clickEvent={() => {this.updateAnswers(this.state.economicSector)}}></ChangePageButton>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
        </div>
    </>
    }
}