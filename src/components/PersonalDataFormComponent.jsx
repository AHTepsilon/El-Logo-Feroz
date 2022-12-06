import React, { Component } from 'react'
import './styles/PersonalDataFormComponent.scss'
import ChangePageButton from '../specs/ChangePageButton'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'

export default class PersonalDataFormComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            email: '',
            acceptedInterestingContent: false,
            wantsNotifEmail: false,
            wantsNotifWhatsapp: false,
            wantsNotifSMS: false,
            acceptedMethodology: false
        }
    }

    async componentDidMount(){
        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
                    if(docSnap.exists()){
                        docSnap.data().nombre != null ? this.setState({nombre: docSnap.data().nombre}) : this.setState({nombre: ''})
                        docSnap.data().telefono != null ? this.setState({telefono: docSnap.data().telefono}) : this.setState({telefono: ''})
                        docSnap.data().email != null ? this.setState({email: docSnap.data().email}) : this.setState({email: ''})
                        docSnap.data().bool_acceptedInterestingContent != null ? this.setState({acceptedInterestingContent: docSnap.data().bool_acceptedInterestingContent}) : this.setState({acceptedInterestingContent: ''})
                        docSnap.data().bool_wantsNotifSMS != null ? this.setState({wantsNotifSMS: docSnap.data().bool_wantsNotifSMS}) : this.setState({wantsNotifSMS: ''})
                        docSnap.data().bool_wantsNotifWhatsapp != null ? this.setState({wantsNotifWhatsapp: docSnap.data().bool_wantsNotifWhatsapp}) : this.setState({wantsNotifWhatsapp: ''})
                        docSnap.data().bool_wantsNotifEmail != null ? this.setState({wantsNotifEmail: docSnap.data().bool_wantsNotifEmail}) : this.setState({wantsNotifEmail: ''})
                        docSnap.data().bool_acceptedMethodology != null ? this.setState({acceptedMethodology: docSnap.data().bool_acceptedMethodology}) : this.setState({acceptedMethodology: ''})
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
            'nombre': this.state.nombre,
            'telefono': this.state.telefono,
            'email': this.state.email,
            'bool_acceptedInterestingContent': this.state.acceptedInterestingContent,
            'bool_wantsNotifEmail': this.state.wantsNotifEmail,
            'bool_wantsNotifWhatsapp': this.state.wantsNotifWhatsapp,
            'bool_wantsNotifSMS': this.state.wantsNotifSMS,
            'bool_acceptedMethodology': this.state.acceptedMethodology
        }
        
        updateUserData(user).then(() => {
            alert('Información guardada con éxito :)')
        })
    }

    render(){
        return <form className='form'>
        <div className='form-main-div'>
            <div className='form-firstColumn'>
                <div className='form-firstColumn-name'>
                    <h4 className='form-firstColumn-name-title'>TU NOMBRE REAL</h4>
                    <input value={this.state.nombre} onChange={(e) => {this.setState({nombre: e.target.value})}} type='text' className='form-firstColumn-name-text form-firstColumn-name-text-name'></input>
                </div>
                <div className='form-firstColumn-email'>
                    <h4 className='form-firstColumn-email-title'>TU CORREO</h4>
                    <input value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} type='email' className='form-firstColumn-name-text form-firstColumn-name-text-name'></input>
                </div>
                <div className='form-firstColumn-checkboxes'>
                    <div className='form-firstColumn-checkboxes-first'>
                        <input checked={this.state.acceptedInterestingContent} onClick = {(e) => {this.setState({acceptedInterestingContent: e.target.checked})}} type='checkbox' className='form-firstColumn-checkboxes-first-check'></input>
                        <p className='form-firstColumn-checkboxes-first-p'>ACEPTO QUE EL LOGO FEROZ! ME ENVÍE CONTENIDO INTERESANTE VÍA CORREO</p>
                    </div>
                    <div className='form-firstColumn-checkboxes-second'>
                        <input checked={this.state.wantsNotifEmail} onClick = {(e) => {this.setState({wantsNotifEmail: e.target.checked})}} type='checkbox' className='form-firstColumn-checkboxes-second-check'></input>
                        <p className='form-firstColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES DEL PROCESO CON EL LOGO FEROZ! VÍA CORREO</p>
                    </div>
                </div>
            </div>
            <div className='form-secondColumn'>
                <div className='form-secondColumn-phone'>
                    <h4 className='form-secondColumn-name-title'>TU CELULAR</h4>
                    <input value={this.state.telefono} onChange={(e) => {this.setState({telefono: e.target.value})}} type='text' className='form-secondColumn-name-text form-secondColumn-name-text-name'></input>
                </div>
                <div className='form-secondColumn-checkboxes'>
                    <div className='form-secondColumn-checkboxes-second'>
                        <input checked={this.state.wantsNotifWhatsapp} onClick = {(e) => {this.setState({wantsNotifWhatsapp: e.target.checked})}} type='checkbox' className='form-secondColumn-checkboxes-second-check'></input>
                        <p className='form-secondColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES VÍA WHATSAPP DEL PROCESO CON EL LOGO FEROZ!</p>
                    </div>
                    <div className='form-secondColumn-checkboxes-second'>
                        <input checked={this.state.wantsNotifSMS} onClick = {(e) => {this.setState({wantsNotifSMS: e.target.checked})}} type='checkbox' className='form-secondColumn-checkboxes-second-check'></input>
                        <p className='form-secondColumn-checkboxes-second-p'>QUIERO RECIBIR NOTIFICACIONES VÍA SMS DEL PROCESO CON EL LOGO FEROZ!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='form-lowercheckbox'>
            <input checked={this.state.acceptedMethodology} onClick = {(e) => {this.setState({acceptedMethodology: e.target.checked})}} type='checkbox' className='form-lowercheckbox-checkbox'></input>
            <p className='form-lowercheckbox-p'>LEÍ Y COMPRENDÍ PERFECTAMENTE LA METODOLOGÍA DEL LOGO FEROZ! Y POR ESO ACEPTO ESTE PROYECTO Y SUS PROCEDIMIENTOS DESCRITOS AQUÍ</p> 
        </div>
        <div>
            <ChangePageButton text='GUARDAR' clickEvent={(e) => {e.preventDefault(); this.updateAnswers()}}></ChangePageButton>
        </div>

    </form>
    }
}