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
        }
    }

    async componentDidMount() {
        validateUser();
        setTimeout(() =>{
            try{
                getDoc(doc(db, "requests", auth.currentUser.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        this.setState({imageLink:docSnap.data().imgToAccept})
                    }})
                }
            catch(error){
                console.log(error);
            }
        }, 2000)
    }

    render(){
        return <>
        <div>
            <h1>DESCARGA TUS ARCHIVOS</h1>
            <h2>FALTAN 60 DÍAS PARA QUE LOS ARCHIVOS DEJEN DE ESTAR DISPONIBLES</h2>
        </div>
        <div className='imageDiv'>
            <img className='imageDiv-img' src={this.state.imageLink} alt="" />
        </div>
        <div>
            <p>LOGO.AI (ADOBE ILLUSTRATOR)</p> <button>DESCARGAR</button>
            <p>LOGO.PNG (MAPA DE BITS)</p> <button>DESCARGAR</button>
            <p>COLORÍMETRÍA.PDF</p> <button>DESCARGAR</button>
            <p>RRSS-PERFIL.PNG</p> <button>DESCARGAR</button>
            <p>RRSS-PORTADA.PNG</p> <button>DESCARGAR</button>
            <p>PAPEL-TAPIZ.PNG</p> <button>DESCARGAR</button>
            <p>UN-REGALO-PARA-TI</p> <button>DESCARGAR</button>
        </div>
        </>
    }
}