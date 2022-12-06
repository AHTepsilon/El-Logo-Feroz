import React, {Component} from 'react'
import './styles/BriefingFormComponent.scss'
import ChangePageButton from '../specs/ChangePageButton'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'

export default class PersonalDataFormComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            textoLogo: '',
            textoMayusMinusExactas: '',
            sloganLogo: '',
            sectorEconomico: '',
            companiaAccion: '',
            principalesProductosServicios: '',
            publicoObjetivo: '',
            coloresRepresentativos: '',
            cosasRepresentativas: '',
            empresasCompetencia: '',
            masQueContar: '',
        }
    }

    async componentDidMount(){
        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
                    if(docSnap.exists()){
                        docSnap.data().brief_textoLogo != null ? this.setState({textoLogo: docSnap.data().brief_textoLogo}) : this.setState({textoLogo: ''})
                        docSnap.data().brief_sloganLogo != null ? this.setState({sloganLogo: docSnap.data().brief_sloganLogo}) : this.setState({sloganLogo: ''})
                        docSnap.data().sectorEconomico != null ? this.setState({sectorEconomico: docSnap.data().sectorEconomico}) : this.setState({sectorEconomico: ''})
                        docSnap.data().brief_companiaAccion != null ? this.setState({companiaAccion: docSnap.data().brief_companiaAccion}) : this.setState({companiaAccion: ''})
                        docSnap.data().brief_principalesProductosServicios != null ? this.setState({principalesProductosServicios: docSnap.data().brief_principalesProductosServicios}) : this.setState({principalesProductosServicios: ''}) 
                        docSnap.data().brief_publicoObjetivo != null ? this.setState({publicoObjetivo: docSnap.data().brief_publicoObjetivo}) : this.setState({publicoObjetivo: ''})
                        docSnap.data().brief_coloresRepresentativos != null ? this.setState({coloresRepresentativos: docSnap.data().brief_coloresRepresentativos}) : this.setState({coloresRepresentativos: ''})
                        docSnap.data().brief_cosasRepresentativas != null ? this.setState({cosasRepresentativas: docSnap.data().brief_cosasRepresentativas}) : this.setState({cosasRepresentativas: ''})
                        docSnap.data().brief_empresasCompetencia != null ? this.setState({empresasCompetencia: docSnap.data().brief_empresasCompetencia}) : this.setState({empresasCompetencia: ''})
                        docSnap.data().brief_masQueContar != null ? this.setState({masQueContar: docSnap.data().brief_masQueContar}) : this.setState({masQueContar: ''})
                        docSnap.data().brief_bool_textoMayusMinusExactas != null ? this.setState({textoMayusMinusExactas: docSnap.data().brief_bool_textoMayusMinusExactas}) : this.setState({textoMayusMinusExactas: ''})  
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
            'brief_textoLogo': this.state.textoLogo,
            'brief_bool_textoMayusMinusExactas': this.state.textoMayusMinusExactas,
            'brief_sloganLogo': this.state.sloganLogo,
            'sectorEconomico': this.state.sectorEconomico,
            'brief_companiaAccion': this.state.companiaAccion,
            'brief_principalesProductosServicios': this.state.principalesProductosServicios,
            'brief_publicoObjetivo': this.state.publicoObjetivo,
            'brief_coloresRepresentativos': this.state.coloresRepresentativos,
            'brief_cosasRepresentativas' : this.state.cosasRepresentativas,
            'brief_empresasCompetencia': this.state.empresasCompetencia,
            'brief_masQueContar': this.state.masQueContar
        }
        
        updateUserData(user).then(() => {
            alert('Información guardada con éxito :)')
        })
    }

    render(){
        return <form className='form'>
        <div className='form-first-div'>
            <div className='form-first-div-logo-text'>
                <h4 className='form-first-div-logo-text-title titles-question'>TEXTO PARA EL LOGO</h4>
                <input value={this.state.textoLogo} onChange={(e) => {this.setState({textoLogo: e.target.value})}} type='text' className='form-first-div-logo-text-text text-input-a'></input>
                <div className='form-first-div-logo-text-checkbox'>
                    <input checked={this.state.textoMayusMinusExactas} onClick = {(e) => {this.setState({textoMayusMinusExactas: e.target.checked})}} type='checkbox' className='form-first-div-logo-text-checkbox-check'></input>
                    <p className='form-first-div-logo-text-checkbox-p'>QUIERO LAS MAYÚSCULAS Y LAS MINÚSCULAS EXACTAMENTE COMO LAS ESCRIBÍ</p>
                </div>
            </div>
            <div className='form-first-div-logo-slogan'>
                <h4 className='form-first-div-logo-slogan-title'>¿TIENE LEMA (SLOGAN)?</h4>
                <input value={this.state.sloganLogo} onChange={(e) => {this.setState({sloganLogo: e.target.value})}} type='text' className='form-first-div-logo-slogan-text text-input-a'></input>
            </div>
        </div>
        <div className='form-second-div'>
            <h4 className='form-second-div-title'>¿A QUÉ SECTOR ECONÓMICO PERTENECE TU EMPRENDIMIENTO?</h4>
            <input value={this.state.sectorEconomico} onChange={(e) => {this.setState({sectorEconomico: e.target.value})}} type='text' className='form-second-div-text text-input-b'></input>
        </div>
        <div className='form-third-div'>
            <h4 className='form-third-div-title'>¿A QUÉ SE DEDICA TU COMPAÑÍA EN POCAS PALABRAS?</h4>
            <input value={this.state.companiaAccion} onChange={(e) => {this.setState({companiaAccion: e.target.value})}} type='text' className='form-third-div-text text-input-b'></input>
        </div>
        <div className='form-fourth-div'>
            <h4 className='form-fourth-div-title'>¿CUÁLES SON LOS PRINCIPALES PRODUCTOS O SERVICIOS QUE OFRECE TU COMPAÑÍA?</h4>
            <input value={this.state.principalesProductosServicios} onChange={(e) => {this.setState({principalesProductosServicios: e.target.value})}} type='text' className='form-fourth-div-text text-input-b'></input>            
        </div>
        <div className='form-fifth-div'>
            <h4 className='form-fifth-div-title'>¿CUÁL ES EL PÚBLICO OBJETIVO DE LOS PRODUCTOS O SERVICIOS QUE TU COMPAÑÍA OFRECE?</h4>
            <input value={this.state.publicoObjetivo} onChange={(e) => {this.setState({publicoObjetivo: e.target.value})}} type='text' className='form-fifth-div-text text-input-b'></input> 
        </div>
        <div className='form-sixth-div'>
            <h4 className='form-sixth-div-title'>¿QUÉ COLORES CREES QUE PUEDAN REPRESENTAR A TU COMPAÑÍA?</h4>
            <input value={this.state.coloresRepresentativos} onChange={(e) => {this.setState({coloresRepresentativos: e.target.value})}} type='text' className='form-sixth-div-text text-input-b'></input> 
        </div>
        <div className='form-seventh-div'>
            <h4 className='form-seventh-div-title'>¿QUÉ COSAS CREES QUE PUEDAN LLEGAR A REPRESENTAR A TU COMPAÑÍA?</h4>
            <input value={this.state.cosasRepresentativas} onChange={(e) => {this.setState({cosasRepresentativas: e.target.value})}} type='text' className='form-seventh-div-text text-input-b'></input> 
        </div>
        <div className='form-eight-div'>
            <h4 className='form-eight-div-title'>¿CUÁLES EMPRESAS CONSIDERAS COMPETENCIA PARA TU COMPAÑÍA?</h4>
            <input value={this.state.empresasCompetencia} onChange={(e) => {this.setState({empresasCompetencia: e.target.value})}} type='text' className='form-eight-div-text text-input-b'></input> 
        </div>
        <div className='form-ninth-div'>
            <h4 className='form-ninth-div-title'>¿QUIERES CONTARLE ALGO MÁS A "EL LOGO FEROZ!" ?</h4>
            <input value={this.state.masQueContar} onChange={(e) => {this.setState({masQueContar: e.target.value})}} type='text' className='form-ninth-div-text text-input-b'></input> 
        </div>
        <div>
            <ChangePageButton text='GUARDAR' clickEvent={(e) => {e.preventDefault(); this.updateAnswers()}}></ChangePageButton>
        </div>
    </form>
    }
}