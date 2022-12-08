import React, {Component} from 'react'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {getStorage, ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import {getImage} from '../script/auth'

export default class RequestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headline: 'EL LOGO FEROZ! ESTÁ DISEÑANDO.',
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

        this.getImage('examplePics', 'example1', 'img1');
        this.getImage('examplePics', 'example2', 'img2');
        this.getImage('examplePics', 'example3', 'img3');
    }

    render(){
        return <>
        <div>
            <h1>{this.state.headline}</h1>
            <div>
                <img src={this.state.img1}></img>
                <img src={this.state.img2}></img>
                <img src={this.state.img3}></img>
            </div>
        </div>
        </>
    }
}