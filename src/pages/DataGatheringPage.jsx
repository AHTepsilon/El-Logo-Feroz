import React, { useState } from "react";
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

function ToggleOthers(exclude) {
  switch (exclude) {
    case "data":
      setIsDataFormVisible(!isDataFormVisible);
      setIsBriefingFormVisible(false);
    case "briefing":
      setIsBriefingFormVisible(!isBriefingFormVisible);
      setIsDataFormVisible(false);
  }
}

function sendData(){

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
              window.location.href = '/RequestPage';
            }, 2000)
          });
        });
      }
      catch(error){
        console.log(error);
        window.location.reload(false);
      }
    }, 1000)
}

function DataGatheringPage() {
  const [isDataFormVisible, setIsDataFormVisible] = useState(false);
  const [isBriefingFormVisible, setIsBriefingFormVisible] = useState(false);
  const [isStyleFormVisible, setIsStyleFormVisible] = useState(false);
  const [isExamplesFormVisible, setIsExamplesFormVisible] = useState(false);
  const [isPlanFormVisible, setIsPlanFormVisible] = useState(false);

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
                setIsDataFormVisible(!isDataFormVisible);
                setIsBriefingFormVisible(false);
                setIsStyleFormVisible(false);
                setIsExamplesFormVisible(false);
                setIsPlanFormVisible(false);
              }}
            >
              <OptionsSelector1
                className="section-options-grid-option"
                lowValue1="9"
                highValue1="0"
                text="DATOS PERSONALES"
              />
            </div>
            <div
              onClick={() => {
                setIsBriefingFormVisible(!isBriefingFormVisible);
                setIsDataFormVisible(false);
                setIsStyleFormVisible(false);
                setIsExamplesFormVisible(false);
                setIsPlanFormVisible(false);
              }}
            >
              <OptionsSelector2
                className="section-options-grid-option"
                lowValue2="10"
                highValue2="0"
                text="BRIEFING"
              />
            </div>
            <div
              onClick={() => {
                setIsBriefingFormVisible(false);
                setIsDataFormVisible(false);
                setIsStyleFormVisible(!isStyleFormVisible);
                setIsExamplesFormVisible(false);
                setIsPlanFormVisible(false);
              }}
            >
              <OptionsSelector3
                className="section-options-grid-option"
                lowValue3="7"
                highValue3="0"
                text="ESTILO"
              />
            </div>
            <div
              onClick={() => {
                setIsBriefingFormVisible(false);
                setIsDataFormVisible(false);
                setIsStyleFormVisible(false);
                setIsExamplesFormVisible(!isExamplesFormVisible);
                setIsPlanFormVisible(false);
              }}
              >
            <OptionsSelector4
              className="section-options-grid-option"
              lowValue4="3"
              highValue4="0"
              text="EJEMPLOS"
            />
            </div>
            <div
              onClick={() => {
                setIsBriefingFormVisible(false);
                setIsDataFormVisible(false);
                setIsStyleFormVisible(false);
                setIsExamplesFormVisible(false);
                setIsPlanFormVisible(!isPlanFormVisible);
              }}
              >
            <OptionsSelector5
              className="section-options-grid-option"
              lowValue5="2"
              highValue5="0"
              text="PLAN"
            />
            </div>
            <OptionsSelector6
              className="section-options-grid-option"
              lowValue6="1"
              highValue6="0"
              text="MÉTODO DE PAGO"
            />
          </div>
        </div>
        <div className="section-button">
          <ChangePageButton
            className="section-button-butt"
            text="PONTE MANOS A LA OBRA, LOGO FEROZ!"
            clickEvent={sendData}
          />
        </div>
      </section>
      {isDataFormVisible ? (
        <div className="PersonalDataPopUp"><PersonalDataFormComponent></PersonalDataFormComponent></div>
      ) : (
        <div></div>
      )}
      {isBriefingFormVisible ? (
        <div className="BriefingPopUp"><BriefingFormComponent></BriefingFormComponent></div>
      ) : (
        <div></div>
      )}
      {isStyleFormVisible ? (
        <div className="StylePopUp"><StyleFormComponent></StyleFormComponent></div>
      ) : (
        <div></div>
      )}
      {isExamplesFormVisible ? (
        <div className="ExamplesPopUp"><ExamplesFormComponent></ExamplesFormComponent></div>
      ) : (
        <div></div>
      )}
      {isPlanFormVisible ? (
        <div className="PlanPopUp"><PlanFormComponent></PlanFormComponent></div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default DataGatheringPage;
