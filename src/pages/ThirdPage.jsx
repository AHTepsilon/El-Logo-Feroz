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
import Slider from '../specs/Slider'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import './styles/ThirdPage.scss'

export default class ThirdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide1: 50,
            slide2: 50,
            slide3: 50,
            slide4: 50,
            slide5: 50,
        }
    }

        async componentDidMount(){
        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
                    if(docSnap.exists()){
                        this.setState({slide1: docSnap.data().percep1_amable_autoritaria})
                        this.setState({slide2: docSnap.data().percep1_amable_autoritaria})
                        this.setState({slide3: docSnap.data().percep1_amable_autoritaria})
                        this.setState({slide4: docSnap.data().percep1_amable_autoritaria})
                        this.setState({slide5: docSnap.data().percep1_amable_autoritaria})
                    }
                    else{
                        this.setState({slide1: 50, slide2: 50, slide3: 50, slide4: 50, slide5: 50,})
                    }
                })
              }
              catch(error){
                console.log(error);
                window.location.reload(false);
              }
        }, 1000);
    }

    updateAnswers(slide1, slide2, slide3, slide4, slide5){
        const user = {
            'percep1_amable_autoritaria': slide1,
            'percep2_innovadora_clasica': slide2,
            'percep3_creativa_seria': slide3,
            'percep4_masiva_exclusiva': slide4,
            'percep5:_convencional_rebelde': slide5,}

        if (this.state.economicSector != ''){
            updateUserData(user).then(() => {
                window.location.href = '/DataGatheringPage'
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
                <PageNumCounter className='page-counter' pageNum='3'></PageNumCounter>
        </div>
        <div className='central-area-div-textbox'>
            <h4 className='tertiary-title'>¿CÓMO TE GUSTARÍA QUE PERCIBIERAN TU MARCA?</h4>
                <Slider value={this.state.slide1} changeEvent={(e) => {this.setState({slide1: e.target.value})}} lowText = 'AMABLE' highText = 'AUTORITARIA'></Slider>
                <Slider value={this.state.slide2} changeEvent={(e) => {this.setState({slide2: e.target.value})}} lowText = 'INNOVADORA' highText = 'CLÁSICA'></Slider>
                <Slider value={this.state.slide3} changeEvent={(e) => {this.setState({slide3: e.target.value})}} lowText = 'CREATIVA' highText = 'SERIA'></Slider>
                <Slider value={this.state.slide4} changeEvent={(e) => {this.setState({slide4: e.target.value})}} lowText = 'MASIVA' highText = 'EXCLUSIVA'></Slider>
                <Slider value={this.state.slide5} changeEvent={(e) => {this.setState({slide5: e.target.value})}} lowText = 'CONVENCIONAL' highText = 'REBELDE'></Slider>
                <ChangePageButton clickEvent={() => {this.updateAnswers(this.state.slide1, this.state.slide2, this.state.slide3, this.state.slide4, this.state.slide5)}} text='SIGUIENTE'></ChangePageButton>
            </div>
            <div className='copyright-area-div'>
                <CopyrightComponent />
            </div>
    </>
    }
}