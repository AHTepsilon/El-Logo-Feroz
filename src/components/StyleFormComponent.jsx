import React, {Component} from 'react'
import './styles/StyleFormComponent.scss'
import Slider from '../specs/Slider'
import ChangePageButton from '../specs/ChangePageButton'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'

export default class StyleFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide1: 50,
            slide2: 50,
            slide3: 50,
            slide4: 50,
            slide5: 50,
            logoType: '',
            typePreference: '',

            check1: false,
            check2: false,
            check3: false,
            check4: false,
            check5: false,
            check6: false,
        }
    }

    async componentDidMount(){
        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
                    if(docSnap.exists()){
                        if(docSnap.data().brief_textoLogo != null){
                            if(docSnap.data().logoType === 'soloTipo'){
                                console.log(this.state.check1)
                                this.setState({check1: true})
                                this.setState({check2: ''})
                                this.setState({check3: ''})
                            }
                            else if(docSnap.data().logoType === 'tipoYSimbolo'){
                                this.setState({check2: true})
                                this.setState({check1: ''})
                                this.setState({check3: ''})
                            }
                            else if(docSnap.data().logoType === 'soloSimbolo'){
                                this.setState({check3: true})
                                this.setState({check1: ''})
                                this.setState({check2: ''})
                            }
                        }

                        if(docSnap.data().typePreference == 'sansSerif'){
                            this.setState({check4: true})
                        }
                        else if(docSnap.data().typePreference == 'Serif'){
                            this.setState({check5: true})
                        }
                        else if(docSnap.data().typePreference == 'Manuscrita'){
                            this.setState({check6: true})
                        }
                    }
                    else{

                    }
                })
              }
              catch(error){
                console.log(error)
              }
        }, 1000);
    }
    updateAnswers(){
        const user = {
            'percep1_amable_autoritaria': this.state.slide1,
            'percep2_innovadora_clasica': this.state.slide2,
            'percep3_creativa_seria': this.state.slide3,
            'percep4_masiva_exclusiva': this.state.slide4,
            'percep5_convencional_rebelde': this.state.slide5,
            'logoType': this.state.logoType,
            'typePreference': this.state.typePreference
        }

        updateUserData(user).then(() => {
            alert('Información guardada con éxito :)')
        })
    }
    render(){
        return <form className='form'>
        <div className='form-sliders'>
            <Slider value={this.state.slide1} changeEvent={(e) => {this.setState({slide1: e.target.value})}} lowText = 'AMABLE' highText = 'AUTORITARIA'></Slider>
            <Slider value={this.state.slide2} changeEvent={(e) => {this.setState({slide2: e.target.value})}} lowText = 'INNOVADORA' highText = 'CLÁSICA'></Slider>
            <Slider value={this.state.slide3} changeEvent={(e) => {this.setState({slide3: e.target.value})}} lowText = 'CREATIVA' highText = 'SERIA'></Slider>
            <Slider value={this.state.slide4} changeEvent={(e) => {this.setState({slide4: e.target.value})}} lowText = 'MASIVA' highText = 'EXCLUSIVA'></Slider>
            <Slider value={this.state.slide5} changeEvent={(e) => {this.setState({slide5: e.target.value})}} lowText = 'CONVENCIONAL' highText = 'REBELDE'></Slider>
        </div>
        <div className='form-type'>
            <div><h4 className='form-type-title'>TIPO DE LOGOTIPO</h4></div>
            <div className='form-type-checkboxes'>
                <div className='form-type-checkboxes-typography form-div'>
                    <h4 className='form-type-checkboxes-typography-title'>SOLO TIPOGRAFÍA</h4>
                    <input defaultChecked={this.state.check1} onClick = {(e) => {this.setState({logoType: 'soloTipo'})}} type='checkbox' id="checkb-t1" className='form-type-checkboxes-typography-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-with form-div'>
                    <h4 className='form-type-checkboxes-symbol-with-title'>CON SÍMBOLO</h4>
                    <input defaultChecked={this.state.check2} onClick = {(e) => {this.setState({logoType: 'tipoYSimbolo'})}} type='checkbox' id="checkb-t2" className='form-type-checkboxes-symbol-with-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-alone form-div'>
                    <h4 className='form-type-checkboxes-symbol-alone-title'>SOLO SÍMBOLO</h4>
                    <input defaultChecked={this.state.check3} onClick = {(e) => {this.setState({logoType: 'soloSimbolo'})}} type='checkbox' id="checkb-t3" className='form-type-checkboxes-symbol-alone-check'></input>
                </div>                
            </div>
        </div>
        <div className='form-type-writing'>
            <h4 className='form-type-title'>¿TIENES PREFERENCIA POR EL TIPO DE LETRA?</h4>
            <div className='form-type-checkboxes'>
                <div className='form-type-checkboxes-typography form-div'>
                    <h4 className='form-type-checkboxes-typography-title'>SANS SERIF</h4>
                    <input defaultChecked={this.state.check4} onClick = {(e) => {this.setState({typePreference: 'sansSerif'})}} type='checkbox' id="checkb-f1" className='form-type-checkboxes-typography-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-with form-div'>
                    <h4 className='form-type-checkboxes-symbol-with-title'>SERIF</h4>
                    <input defaultChecked={this.state.check5} onClick = {(e) => {this.setState({typePreference: 'Serif'})}} type='checkbox' id="checkb-f2" className='form-type-checkboxes-symbol-with-check'></input>
                </div>
                <div className='form-type-checkboxes-symbol-alone form-div'>
                    <h4 className='form-type-checkboxes-symbol-alone-title'>MANUSCRITA</h4>
                    <input defaultChecked={this.state.check6} onClick = {(e) => {this.setState({typePreference: 'Manuscrita'})}} type='checkbox' id="checkb-f3" className='form-type-checkboxes-symbol-alone-check'></input>
                </div>                
            </div>
        </div>
        <div>
            <ChangePageButton text='GUARDAR' clickEvent={(e) => {e.preventDefault(); this.updateAnswers()}}></ChangePageButton>
        </div>
    </form>
    }
}