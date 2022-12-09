import React, { Component } from "react";
import {
  OptionsSelector1,
  OptionsSelector2,
  OptionsSelector3,
  OptionsSelector4,
  OptionsSelector5,
  OptionsSelector6,
} from "../specs/OptionsSelector";
import ChangePageButton from "../specs/ChangePageButton";
import PersonalDataFormComponent from "../components/PersonalDataFormComponent";
import BriefingFormComponent from "../components/BriefingFormComponent";
import StyleFormComponent from "../components/StyleFormComponent";
import ExamplesFormComponent from "../components/ExamplesFormComponent";
import PlanFormComponent from '../components/PlanFormComponent'
import {app, auth, db, storage} from '../firebase/firebase'
import { doc, setDoc, updateDoc, collection, getDoc } from "firebase/firestore";
import {logIn, logOut, validateUser, sendUserToDatabase, updateUserData, userExists} from '../script/auth'
import "./styles/DataGatheringPage.scss";

export default class DataGatheringPage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isDataFormVisible : false,
      isBriefingFormVisible : false,
      isStyleFormVisible : false,
      isExamplesFormVisible : false,
      isPlanFormVisible : false,
    
      percentage1 : [],
      percentage1Average : 0,
      percentage2 : [],
      percentage2Average : 0,
      percentage3 : [],
      percentage3Average : 0,
      percentage4 : [],
      percentage4Average : 0,
      percentage5 : [],
      percentage5Average : 0,
      percentage6 : [],
      percentage6Average : 0,
    }
  }
  
  sendData(){
  
    let dataToSend = {
  
    };
  
    validateUser();
      setTimeout(() => {
        try{
          getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap =>{
            dataToSend = docSnap.data();
            console.log(dataToSend)
            setDoc(doc(db, "requests", auth.currentUser.uid), dataToSend);
            let newDataToSend = {
              'estado': 'Pendiente',
              'pago': 'Pendiente'
            }
            updateDoc(doc(db, "requests", auth.currentUser.uid), newDataToSend).then(() => {
              alert('Solicitud enviada, espera a que El Logo Feroz! haga su magia!');
              setTimeout(() =>{
                window.top.location = '/RequestPage';
              }, 2000)
            });
          });
        }
        catch(error){
          console.log(error);
          window.location.reload(false);
        };
      }, 1000)
  }
  
  gatherPercentages() {
    validateUser();
              setTimeout(() =>{
                try{
                  getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
                      if (docSnap.exists()) {
                          docSnap.data().nombre != "" && docSnap.data().nombre != null ? this.state.percentage1.push(1) : this.state.percentage1.push(0)
                          docSnap.data().email != "" && docSnap.data().nombre != null ? this.state.percentage1.push(1) : this.state.percentage1.push(0)
                          docSnap.data().phone != "" && docSnap.data().nombre != null ? this.state.percentage1.push(1) : this.state.percentage1.push(0)
                          docSnap.data().bool_acceptedMethodology != false ? this.state.percentage1.push(1) : this.state.percentage1.push(0)

                          
                          this.setState({percentage1Average: this.state.percentage1[0] + this.state.percentage1[1] + this.state.percentage1[2] + this.state.percentage1[3]})                           
                          console.log(this.state.percentage1Average)

                          docSnap.data().sectorEconomico != "" && docSnap.data().brief_bool_textoMayusMinusExactas != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_coloresRepresentativos  != "" && docSnap.data().brief_coloresRepresentativos != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_companiaAccion != "" && docSnap.data().brief_companiaAccion != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_cosasRepresentativas != "" && docSnap.data().brief_cosasRepresentativas != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)  
                          docSnap.data().brief_empresasCompetencia != "" && docSnap.data().brief_empresasCompetencia != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_principalesProductosServicios != "" && docSnap.data().brief_principalesProductosServicios != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_publicoObjetivo != "" && docSnap.data().brief_publicoObjetivo != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)  
                          docSnap.data().brief_sloganLogo != "" && docSnap.data().brief_sloganLogo != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          docSnap.data().brief_textoLogo != "" && docSnap.data().brief_textoLogo != null ? this.state.percentage2.push(1) : this.state.percentage2.push(0)
                          
                          this.state.percentage2.forEach(element => {
                            console.log(element)
                            if(element == 0){
                              this.state.percentage2.pop(element);
                            }
                          });
                          
                          this.setState({percentage2Average: this.state.percentage2[0] + this.state.percentage2[1] + this.state.percentage2[2] + this.state.percentage2[3] + this.state.percentage2[4]+ this.state.percentage2[5]+ this.state.percentage2[6]+this.state.percentage2[7]+this.state.percentage2[8]})                           
                          console.log(this.state.percentage2Average)

                          docSnap.data().percep1_amable_autoritaria != "" && docSnap.data().percep1_amable_autoritaria != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)
                          docSnap.data().percep2_innovadora_clasica  != "" && docSnap.data().percep2_innovadora_clasica != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)
                          docSnap.data().percep3_creativa_seria != "" && docSnap.data().percep3_creativa_seria != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)
                          docSnap.data().percep4_masiva_exclusiva != "" && docSnap.data().percep4_masiva_exclusiva != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)  
                          docSnap.data().percep5_convencional_rebelde != "" && docSnap.data().percep5_convencional_rebelde != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)
                          docSnap.data().logoType != "" && docSnap.data().logoType != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)
                          docSnap.data().typePreference != "" && docSnap.data().typePreference != null ? this.state.percentage3.push(1) : this.state.percentage3.push(0)                            
                          
                          this.state.percentage3.forEach(element => {
                            console.log(element)
                            if(element == 0){
                              this.state.percentage3.pop(element);
                            }
                          });
                          
                          this.setState({percentage3Average: this.state.percentage3[0] + this.state.percentage3[1] + this.state.percentage3[2] + this.state.percentage3[3] + this.state.percentage3[4]+ this.state.percentage3[5]+ this.state.percentage3[6]})                           
                          console.log(this.state.percentage3)

                          docSnap.data().planSize != "" && docSnap.data().planSize != null ? this.state.percentage5.push(1) : this.state.percentage5.push(0)
                          docSnap.data().disenoTipo  != "" && docSnap.data().disenoTipo != null ? this.state.percentage5.push(1) : this.state.percentage5.push(0)

                          this.state.percentage5.forEach(element => {
                            console.log(element)
                            if(element == 0){
                              this.state.percentage5.pop(element);
                            }
                          });
                          
                          this.setState({percentage5Average: this.state.percentage5[0] + this.state.percentage5[1]})                           
                          console.log(this.state.percentage5)
                      }})
                  }
              catch(error){
                  console.log(error);
                  window.location.reload(false);
              }
              }, 2000)
  
  }

  async componentDidMount() {
    this.gatherPercentages()
  }

  render(){
    return (
      <>
        <header>
          <div className="logo-div"></div>
          <div className="user-div"></div>
        </header>
        <section>
          <div className="section-select-div">
            <select className="section-select-div-select"></select>
          </div>
          <div className="section-options-grid">
            <div className="section-options-grid-gridarea">
              <div
                onClick={() => {
                  this.setState({isDataFormVisible : true})
                  this.setState({isBriefingFormVisible : false})
                  this.setState({isStyleFormVisible : false})
                  this.setState({isExamplesFormVisible : false})
                  this.setState({isPlanFormVisible : false})
                }}
              >
                <OptionsSelector1
                  className="section-options-grid-option"
                  lowValue1="4"
                  highValue1={(this.state.percentage1Average).toString()}
                  text="DATOS PERSONALES"
                />
              </div>
              <div
                onClick={() => {
                  this.setState({isDataFormVisible : false})
                  this.setState({isBriefingFormVisible : true})
                  this.setState({isStyleFormVisible : false})
                  this.setState({isExamplesFormVisible : false})
                  this.setState({isPlanFormVisible : false})
                }}
              >
                <OptionsSelector2
                  className="section-options-grid-option"
                  lowValue2="9"
                  highValue2={(this.state.percentage2Average).toString()}
                  text="BRIEFING"
                />
              </div>
              <div
                onClick={() => {
                  this.setState({isDataFormVisible : false})
                  this.setState({isBriefingFormVisible : false})
                  this.setState({isStyleFormVisible : true})
                  this.setState({isExamplesFormVisible : false})
                  this.setState({isPlanFormVisible : false})
                }}
              >
                <OptionsSelector3
                  className="section-options-grid-option"
                  lowValue3="7"
                  highValue3={(this.state.percentage3Average).toString()}
                  text="ESTILO"
                />
              </div>
              <div
                onClick={() => {
                  this.setState({isDataFormVisible : false})
                  this.setState({isBriefingFormVisible : false})
                  this.setState({isStyleFormVisible : false})
                  this.setState({isExamplesFormVisible : true})
                  this.setState({isPlanFormVisible : false})
                }}
                >
              <OptionsSelector4
                className="section-options-grid-option"
                lowValue4="3"
                highValue4={(this.state.percentage4Average).toString()}
                text="EJEMPLOS"
              />
              </div>
              <div
                onClick={() => {
                  this.setState({isDataFormVisible : false})
                  this.setState({isBriefingFormVisible : false})
                  this.setState({isStyleFormVisible : false})
                  this.setState({isExamplesFormVisible : false})
                  this.setState({isPlanFormVisible : true})
                }}
                >
              <OptionsSelector5
                className="section-options-grid-option"
                lowValue5="2"
                highValue5={(this.state.percentage5Average).toString()}
                text="PLAN"
              />
              </div>
              <OptionsSelector6
                className="section-options-grid-option"
                lowValue6="1"
                highValue6={(this.state.percentage6Average).toString()}
                text="MÉTODO DE PAGO"
              />
            </div>
          </div>
          <div className="section-button">
            <ChangePageButton
              className="section-button-butt"
              text="PONTE MANOS A LA OBRA, LOGO FEROZ!"
              clickEvent={this.sendData}
            />
          </div>
        </section>
        {this.state.isDataFormVisible ? (
          <div className="PersonalDataPopUp"><PersonalDataFormComponent></PersonalDataFormComponent></div>
        ) : (
          <div></div>
        )}
        {this.state.isBriefingFormVisible ? (
          <div className="BriefingPopUp"><BriefingFormComponent></BriefingFormComponent></div>
        ) : (
          <div></div>
        )}
        {this.state.isStyleFormVisible ? (
          <div className="StylePopUp"><StyleFormComponent></StyleFormComponent></div>
        ) : (
          <div></div>
        )}
        {this.state.isExamplesFormVisible ? (
          <div className="ExamplesPopUp"><ExamplesFormComponent></ExamplesFormComponent></div>
        ) : (
          <div></div>
        )}
        {this.state.isPlanFormVisible ? (
          <div className="PlanPopUp"><PlanFormComponent></PlanFormComponent></div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}