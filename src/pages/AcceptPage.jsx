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
import './styles/AcceptPage.scss'

export default class AcceptPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageLink: '',
            status: ''
        }
    }

    confirmImage = async () => {
        this.setState({status: 'Aceptado'});
        const newStatus = {
            estado: 'Aceptado'
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newStatus);
        window.location.href = '/FinalPage';
    }

    async componentDidMount() {
        validateUser();
            setTimeout(() =>{
                try{
                    getDoc(doc(db, "requests", auth.currentUser.uid)).then((docSnap) => {
                        if (docSnap.exists()) {
                            this.setState({imageLink:docSnap.data().imgToAccept})
                            this.setState({status:docSnap.data().estado})
                        }})
                    }
                catch(error){
                    console.log(error);
                    window.location.reload(false);
                }
            }, 2000)
        }

    render(){
        return <>
            <div className='mainDiv'>
                <img className='mainDiv-img' src = {this.state.imageLink}></img>
                <h2>¿CONFIRMAS QUE ESTE SERÁ TU LOGO?</h2>
                <h3>SI CONFIRMAS, NO HAY MARCHA ATRÁS</h3>
                <button onClick={this.confirmImage}>¡CONFIRMADO!</button>
            </div>
        </>
    }
}