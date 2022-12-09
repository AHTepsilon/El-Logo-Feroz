import React, {Component} from 'react';
import { app, auth, db, storage } from "../firebase/firebase";
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
    logIn,
    logOut,
    validateUser,
    uploadImage,
    sendUserToDatabase,
    updateUserData,
    userExists,
  } from "../script/auth";
import './styles/FinalPage.scss'

export default class FinalPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            imageLink: '',
            AIfile: '',
            PNGfile: '',
            Colorimetria: '',
            RRSSpe: '',
            RRSSpo: '',
            pT: '',
            Gift: '',
        }
    }

    async downloadFile(name){
        setTimeout(() =>{
            validateUser();
            getDownloadURL(
              ref(storage, `files/${auth.currentUser.uid}/${name}`)
            )
              .then((url) => {
                alert('Usa este link para descargar el archivo: ' + url)
              })
            }, 2000)
        }

    async componentDidMount() {
        validateUser();
        setTimeout(() =>{
            try{
                getDoc(doc(db, "requests", auth.currentUser.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        this.setState({imageLink:docSnap.data().imgToAccept})
                        docSnap.data().file_AIfile != null ? this.setState({AIfile:docSnap.data().file_AIfile}) : this.setState({AIfile:false})
                        docSnap.data().file_PNGfile != null ? this.setState({PNGfile:docSnap.data().file_PNGfile}) : this.setState({PNGfile:false})
                        docSnap.data().file_Colorimetria != null ? this.setState({Colorimetria:docSnap.data().file_Colorimetria}) : this.setState({Colorimetria:false})
                        docSnap.data().file_RRSSpe != null ? this.setState({RRSSpe:docSnap.data().file_RRSSpe}) : this.setState({RRSSpe:false})
                        docSnap.data().file_RRSSpo != null ? this.setState({RRSSpo:docSnap.data().file_RRSSpo}) : this.setState({RRSSpo:false})
                        docSnap.data().file_PT != null ? this.setState({pT:docSnap.data().file_PT}) : this.setState({pT:false})
                        docSnap.data().file_Gift != null ? this.setState({Gift:docSnap.data().file_Gift}) : this.setState({Gift:false})

                    }})
                }
            catch(error){
                console.log(error);
                window.location.reload(false);
            }
        }, 2000)
    }

    render(){
        return <div className = 'centralDiv'>
        <div className = 'titleDiv'>
            <h1 className = 'titleDiv-h1'>DESCARGA TUS ARCHIVOS</h1>
            <h2 className = 'titleDiv-h2'>FALTAN 60 DÍAS PARA QUE LOS ARCHIVOS DEJEN DE ESTAR DISPONIBLES</h2>
        </div>
        <div className='imageDiv'>
            <img className='imageDiv-img' src={this.state.imageLink} alt="" />
        </div>
        <div className = 'subtitlesDiv'>
            <h3 className = 'subtitlesDiv-h3'>Tus archivos estarán listos en breve!</h3>
            <h4 className = 'subtitlesDiv-h4'>Recarga la página</h4>
        </div>
        <div className = 'inputsDiv'>
            <div className = 'inputsDiv-div'><p>LOGO.AI (ADOBE ILLUSTRATOR)</p> <button onClick={() => this.downloadFile('AIfile')} disabled = {!this.state.AIfile}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>LOGO.PNG (MAPA DE BITS)</p> <button onClick={() => this.downloadFile('PNGfile')} disabled = {!this.state.PNGfile}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>COLORÍMETRÍA.PDF</p> <button onClick={() => this.downloadFile('Colorimetria')} disabled = {!this.state.Colorimetria}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>RRSS-PERFIL.PNG</p> <button onClick={() => this.downloadFile('RRSSpe')} disabled = {!this.state.RRSSpe}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>RRSS-PORTADA.PNG</p> <button onClick={() => this.downloadFile('RRSSpo')}  disabled = {!this.state.RRSSpo}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>PAPEL-TAPIZ.PNG</p> <button onClick={() => this.downloadFile('PT')} disabled = {!this.state.pT}>DESCARGAR</button></div>
            <div className = 'inputsDiv-div'><p>UN-REGALO-PARA-TI</p> <button onClick={() => this.downloadFile('Gift')} disabled = {!this.state.Gift}>DESCARGAR</button></div>
        </div>
        </div>
    }
}