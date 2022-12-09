import React, {Component} from 'react'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {getStorage, ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import {getImage} from '../script/auth'
import './styles/RequestPage.scss';

export default class RequestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headline: '',
            isPending: true,
            img1: '',
            img2: '',
            img3: '',
        }
    }

    async getImage(toRef, file, img){
        setTimeout(() => {
            validateUser();
            getDownloadURL(ref(storage, `images/${toRef}/${auth.currentUser.uid}/${file}`))
            .then((url) => {

              if(img == 'img1'){
                this.setState({img1: url})
              }
              
              if(img == 'img2'){
                this.setState({img2: url})
              }
              
              if(img == 'img3'){
                this.setState({img3: url})
              }
            })
            .catch((error) => {
              // Handle any errors
            });
            
          },2000)
    }

    async componentDidMount(){
      const timeout = setTimeout(() => {
        try{
          getDoc(doc(db, "requests", auth.currentUser.uid)).then(docSnap => {
            if(docSnap.exists()){
              if(docSnap.data().estado == 'Pendiente'){
                this.setState({headline: 'ESPERA MIENTRAS EL LOGO FEROZ! REALIZA TUS DISEÑOS'})
              }
              if(docSnap.data().estado == 'Esperando Respuesta'){
                this.setState({headline: 'TUS LOGOS ESTÁN LISTOS! ELIGE EL QUE PREFIERAS O REALIZA CAMBIOS'})
              }
            }
          })
        }
        catch(error){
          console.log(error)
        }}, 2000)

        this.getImage('propuestas', 'propuesta1', 'img1');
        this.getImage('propuestas', 'propuesta2', 'img2');
        this.getImage('propuestas', 'propuesta3', 'img3');
    }

    render(){
        return <>
        <div className = 'mainDiv'>
            <h1 className = 'mainDiv-title'>{this.state.headline}</h1>
            <div className='mainDiv-div'>
                <img className='mainDiv-div-img' src={this.state.img1}></img>
                <img className='mainDiv-div-img' src={this.state.img2}></img>
                <img className='mainDiv-div-img' src={this.state.img3}></img>
            </div>
        </div>
        </>
    }
}