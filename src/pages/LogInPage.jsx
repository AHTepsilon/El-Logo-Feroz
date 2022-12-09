import React, {useState, Component} from 'react';
import FirstPage from './FirstPage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate ,
    useNavigate
  } from "react-router-dom";
import Titles from '../specs/Titles'
import PageNumCounter from '../specs/PageNumCounter'
import TextBox from '../specs/TextBox'
import ChangePageButton from '../specs/ChangePageButton'
import CopyrightComponent from '../specs/CopyrightComponent'
import Slider from '../specs/Slider'
import CountryDropdown from 'country-dropdown-with-flags-for-react'; 
import {app, auth, db, storage} from '../firebase/firebase'
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import './styles/LogInPage.scss'

export default class LogInPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            phoneNum: '',
            didAccept: false,
            hasLoggedIn: false,
            userExists: false
        };

    }

    async componentDidMount(){
    validateUser();
            setTimeout(() => {
                if(auth.currentUser != '' && auth.currentUser != null){
                    window.top.location = '/FirstPage'
                }
            }, 2000)
    }

    handleChange = (event) => {
        console.log(event);
        this.setState({phoneNum: event.target.value})
        this.props.onChange(e)
    }
    
    loginValidation = (provider, phoneNum, didAccept, props) =>{
        if(didAccept){
            logIn(provider);
            const user = {
                'telefono': phoneNum
            }
            validateUser()
            this.setState({userExists: true});
        }
        else{
            alert('Por favor acepta los términos y condiciones y la política de privacidad')
        }

    }

    render(){
        return <>
            <div className='logo-div'>

            </div>
            <div className='central-area-div'>
                <Titles className='title' text="YA CASI ESTÁS LISTO PARA COMENZAR"></Titles>
            </div>
            <div className='central-area-div-textbox'>
                <h4 className='central-area-div-textbox-title-loginpage'>EL LOGO FEROZ! NECESITA SABER TU PAÍS. INICIA SESIÓN CON ALGÚN MÉTODO Y ESTARÁS DENTRO :)</h4>
                <h4 className='central-area-div-textbox-title-loginpage'>RECARGA LA PÁGINA LUEGO DE INICIAR SESIÓN</h4> 
                <div className="central-area-div-textbox-input-div">
                    <CountryDropdown  id="UNIQUE_ID" className='central-area-div-textbox-input-div-country' preferredCountries={['co', 'us']}  value="" ></CountryDropdown>
                    {/*<input value={this.state.phoneNum} onChange={(e) => {this.setState({phoneNum: e.target.value})}} type="text" placeholder="Número Telefónico" className="central-area-div-textbox-input-div-input" required></input>*/}
                </div>
                <div className='central-area-div-textbox-buttons'>
                    <div className='central-area-div-textbox-buttons-google-div'>
                        <button onClick={() => {this.loginValidation('google', this.state.phoneNum, this.state.didAccept)}} className='central-area-div-textbox-buttons-google-div-button'>Continuar con Google</button>
                        {/*<Link to='/FirstPage'><button className='central-area-div-textbox-buttons-google-div-button'>Continuar con Google</button></Link>*/}                
                    </div>
                    <div className='central-area-div-textbox-buttons-meta-div'>
                        <Link to='/FirstPage'><button className='central-area-div-textbox-buttons-meta-div-button'>Continuar con Meta</button></Link>
                    </div>
                </div>
                <div className = "central-area-div-textbox-checkBox-div">
                    <input onClick = {(e) => {this.setState({didAccept: e.target.checked})}} className = "central-area-div-textbox-checkBox-div-input" type='checkbox'></input> <p className = "central-area-div-textbox-checkBox-div-text">ACEPTO LOS TÉRMINOS Y CONDICIONES DEL SERVICIO Y LA POLÍTICA DE PRIVACIDAD DE EL LOGO FEROZ!</p>
                </div>
                <div className='copyright-area-div'>
                    <CopyrightComponent />
                </div>
            </div>
        </>
    }
}