import React, { Component } from 'react';
import {validateUser} from '../script/auth'
import {app, auth, db} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc, getDocs } from "firebase/firestore"; 
import './styles/AdminPage.scss'

export default class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsArray: [],
        }
    }

    async componentDidMount() {
        validateUser();
        let items = [];

        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        })

        this.setState({itemsArray: items});
        console.log({itemsArray: [...this.state.itemsArray, ...items]});
    }

    render(){

        let renderedList = this.state.itemsArray.map(item => 
        <li className='admin-page-section-blocks-list-item' key={item}>
                <h2>{item.nombreEmprendimiento}</h2>
                <p>{item.id}</p>
        </li>)

        return <>
        <div className='admin-page-title-div'>
            <h1 className='admin-page-title-div-h'> Página de Administrador</h1>
        </div>
        <section className='admin-page-section'>
            <div className='admin-page-section-blocks'>
                <ul className='admin-page-section-blocks-list'>
                {renderedList}
                </ul>
            </div>
            <div>

            </div>
        </section>
        </>
    }
}