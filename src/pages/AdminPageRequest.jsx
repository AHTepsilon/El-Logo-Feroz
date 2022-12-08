import React, { Component } from 'react'
import {getRequestsById} from '../script/auth'
import {useParams} from 'react-router-dom'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore"; 
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import queryString from 'query-string';

export default class AdminPageRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: {},
            id: '',
            name: '',
            email: '',
            phone: '',
            business: '',
            businessSector: '',
            status: '',
            perc1: '',
            perc2: '',
            perc3: '',
            perc4: '',
            perc5: '',
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
            logoType: '',
            typePreference: '',
            disenoTipo: '',
            planSize: '',
            promoCode: '',
            sinAnimoDeLucro: '',
            acceptedInterestingContent: '',
            wantsNotifEmail: '',
            wantsNotifWhatsapp: '',
            wantsNotifSMS: '',
            acceptedMethodology: '',
        }
    }

    async componentDidMount(){
        let currentUrl = {
            'id': (window.location.pathname.split('/')[3])
        };
        this.setState({current: currentUrl})
        console.log(currentUrl)

        validateUser();
        const myTimeout = setTimeout(() => {
            try{
                getDoc(doc(db, 'requests', currentUrl.id)).then(docSnap =>{
                    if(docSnap.exists()){
                        console.log(docSnap.data())
                        this.setState({business: docSnap.data().nombreEmprendimiento})
                        this.setState({id: docSnap.data().id})

                        this.setState({name: docSnap.data().nombre})
                        this.setState({phone: docSnap.data().telefono})
                        this.setState({email: docSnap.data().email})
                        this.setState({businessSector: docSnap.data().sectorEconomico})

                        this.setState({perc1: docSnap.data().percep1_amable_autoritaria})
                        this.setState({perc2: docSnap.data().percep2_innovadora_clasica})
                        this.setState({perc3: docSnap.data().percep3_creativa_seria})
                        this.setState({perc4: docSnap.data().percep4_masiva_exclusiva})
                        this.setState({perc5: docSnap.data().percep5_convencional_rebelde})
                        
                        this.setState({textoLogo: docSnap.data().brief_textoLogo})
                        this.setState({sloganLogo: docSnap.data().brief_sloganLogo})
                        this.setState({sectorEconomico: docSnap.data().sectorEconomico})
                        this.setState({companiaAccion: docSnap.data().brief_companiaAccion})
                        this.setState({principalesProductosServicios: docSnap.data().brief_principalesProductosServicios})
                        this.setState({publicoObjetivo: docSnap.data().brief_publicoObjetivo})
                        this.setState({coloresRepresentativos: docSnap.data().brief_coloresRepresentativos})
                        this.setState({cosasRepresentativas: docSnap.data().brief_cosasRepresentativas})
                        this.setState({empresasCompetencia: docSnap.data().brief_empresasCompetencia})
                        this.setState({masQueContar: docSnap.data().brief_masQueContar})
                        this.setState({textoMayusMinusExactas: docSnap.data().brief_bool_textoMayusMinusExactas})
                    
                        this.setState({logoType: docSnap.data().logoType})
                        this.setState({typePreference: docSnap.data().typePreference})
                    
                        this.setState({disenoTipo: docSnap.data().disenoTipo})
                        this.setState({planSize: docSnap.data().planSize})
                        this.setState({promoCode: docSnap.data().promoCode})
                        this.setState({sinAnimoDeLucro: docSnap.data().sinAnimoDeLucro.toString()})
                   
                        this.setState({wantsNotifEmail: docSnap.data().bool_wantsNotifEmail.toString()})
                        this.setState({wantsNotifWhatsapp: docSnap.data().bool_wantsNotifWhatsapp.toString()})
                        this.setState({wantsNotifSMS: docSnap.data().bool_wantsNotifSMS.toString()})
                        this.setState({acceptedMethodology: docSnap.data().bool_acceptedMethodology.toString()})

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

    render(){
        return <>
            <div>
                <h1>{this.state.business}</h1>
                <h4>Guardado con el id {this.state.id}</h4>
            </div>
            <div>
                <h3>Nombre del cliente: {this.state.name}</h3>
                <h3>Telefóno: {this.state.phone}</h3>
                <h3>email: {this.state.email}</h3>
            </div>
            <div>
                <h2>Datos del pedido</h2>
                <h3>Sector económico de la empresa: {this.state.businessSector}</h3>
                    <div>
                        <p>Índice amable-autoritaria(0 = más amable, 100 = más autoritaria): </p> <p><b>{this.state.perc1}</b></p>
                        <p>Índice innovadora-clásica(0 = más innovadora, 100 = más clásica): </p> <p><b>{this.state.perc2}</b></p>
                        <p>Índice creativa-seria(0 = más creativa, 100 = más seria): </p> <p><b>{this.state.perc3}</b></p>
                        <p>Índice masiva-exclusiva(0 = más masiva, 100 = más exclusiva): </p> <p><b>{this.state.perc4}</b></p>
                        <p>Índice convencional-rebelde(0 = más convencional, 100 = más rebelde): </p> <p><b>{this.state.perc5}</b></p>
                    </div>
                    <div>
                        <h4>Texto para el logo: {this.state.textoLogo}</h4>
                        <h4>Slogan para el logo: {this.state.sloganLogo}</h4>
                        <h4>Las mayúsculas y minúsculas exactas: {this.state.textoMayusMinusExactas}</h4>
                        <p>¿A qué se dedica?: {this.state.companiaAccion}</p>
                        <p>¿Cuáles son sus principales productos y servicios?: {this.state.principalesProductosServicios}</p>
                        <p>¿Cuál es su público objetivo?: {this.state.publicoObjetivo}</p>
                        <p>Colores representativos: {this.state.coloresRepresentativos}</p>
                        <p>Cosas representativas: {this.state.cosasRepresentativas}</p>
                        <p>Empresas que son competencia: {this.state.empresasCompetencia}</p>
                        <p>¿Algo más que contar?: {this.state.masQueContar}</p>
                    </div>
                    <div>
                        <h4>Tipo de logo: {this.state.logoType}</h4>
                        <h4>Preferencia de tipografía: {this.state.typePreference}</h4>
                    </div>
                    <div>
                        <h4>Tipo de diseño: {this.state.disenoTipo}</h4>
                        <h4>Tamaño del plan: {this.state.planSize}</h4>
                        <h4>Código Promocional: {this.state.promoCode}</h4>
                        <h4>¿Es sin ánimo de lucro?: {this.state.sinAnimoDeLucro}</h4>
                    </div>
                    <div>
                        <p>Quiere notificaciones por correo: {this.state.wantsNotifEmail}</p>
                        <p>Quiere notificaciones por WhatsApp: {this.state.wantsNotifWhatsapp}</p>
                        <p>Quiere notificaciones por SMS: {this.state.wantsNotifSMS}</p>
                        <p>Aceptó metodología {this.state.acceptedMethodology}</p>
                    </div>
            </div>
            <div>
            </div>
        </>
    }
}