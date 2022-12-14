import React, { Component } from "react";
import { getRequestsById } from "../script/auth";
import { useParams } from "react-router-dom";
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
  uploadOtherData,
} from "../script/auth";
import queryString from "query-string";
import "./styles/AdminPageRequest.scss";

export default class AdminPageRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: {},
      id: "",
      name: "",
      email: "",
      phone: "",
      business: "",
      businessSector: "",
      status: "",
      payment: "",
      perc1: "",
      perc2: "",
      perc3: "",
      perc4: "",
      perc5: "",
      textoLogo: "",
      textoMayusMinusExactas: "",
      sloganLogo: "",
      sectorEconomico: "",
      companiaAccion: "",
      principalesProductosServicios: "",
      publicoObjetivo: "",
      coloresRepresentativos: "",
      cosasRepresentativas: "",
      empresasCompetencia: "",
      masQueContar: "",
      logoType: "",
      typePreference: "",
      disenoTipo: "",
      planSize: "",
      promoCode: "",
      sinAnimoDeLucro: "",
      acceptedInterestingContent: "",
      wantsNotifEmail: "",
      wantsNotifWhatsapp: "",
      wantsNotifSMS: "",
      acceptedMethodology: "",
      img1: "",
      img2: "",
      img3: "",
      imgToSend1: "",
      imgToSend2: "",
      imgToSend3: "",
      imgToSend4: "",
      imgToSend5: "",
      imgToSend6: "",
      acceptedImage: "",
      imgForRevision: "",
      revision: "",
    };
  }

  async getAcceptedImage() {
    const timeout = setTimeout(() => {
      try {
        getDoc(doc(db, "requests", auth.currentUser.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().estado == "Aceptado") {
              this.setState({ acceptedImage: docSnap.data().imgToAccept });
            }
            if (docSnap.data().estado == "Enviado para Revisi??n") {
              this.setState({ imgForRevision: docSnap.data().imgToRevision });
            }
          }
        });
      } catch (error) {
        console.log(error);
        window.location.reload(false);
      }
    }, 2000);
  }

  async getImage(toRef, file, img) {
    setTimeout(() => {
      validateUser();
      getDownloadURL(
        ref(storage, `images/${toRef}/${auth.currentUser.uid}/${file}`)
      )
        .then((url) => {
          if (img == "img1") {
            this.setState({ img1: url });
          }

          if (img == "img2") {
            this.setState({ img2: url });
          }

          if (img == "img3") {
            this.setState({ img3: url });
          }

          if (img == "Pimg1") {
            this.setState({ imgToSend1: url });
          }

          if (img == "Pimg2") {
            this.setState({ imgToSend2: url });
          }

          if (img == "Pimg3") {
            this.setState({ imgToSend3: url });
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    }, 2000);
  }

  updatePayment = async () => {
    if (this.state.img1) this.setState({ payment: "Realizado" });

    let newPayment = {
      pago: "Realizado",
    };

    try {
      await updateDoc(doc(db, "requests", auth.currentUser.uid), newPayment);
      alert("Estado del pago actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  uploadData = async (file, name) => {
    try{
    uploadImage(`files/${auth.currentUser.uid}/${name}`, file);

    if(name == 'AIfile'){
      let dataToUpload = {
        file_AIfile: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'PNGfile'){
      let dataToUpload = {
        file_PNGfile: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'Colorimetria'){
      let dataToUpload = {
        file_Colorimetria: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'RRSSPe'){
      let dataToUpload = {
        file_RRSSPe: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'RRSSPo'){
      let dataToUpload = {
        file_RRSSPo: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'PT'){
      let dataToUpload = {
        file_PT: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
      
    if(name == 'Gift'){
      let dataToUpload = {
        file_Gift: true
      }
      await updateDoc(doc(db, "requests", auth.currentUser.uid), dataToUpload);
      }
    }
    catch(error){
      console.log(error)
    }
  };

  uploadImages = async () => {
    try {
      uploadImage(
        `images/propuestas/${auth.currentUser.uid}/propuesta1`,
        this.state.imgToSend1
      );
      uploadImage(
        `images/propuestas/${auth.currentUser.uid}/propuesta2`,
        this.state.imgToSend2
      );
      uploadImage(
        `images/propuestas/${auth.currentUser.uid}/propuesta3`,
        this.state.imgToSend3
      );

      this.setState({ status: "Esperando Respuesta" });

      let newStatus = {
        estado: "Esperando Respuesta",
      };

      console.log(
        "images",
        this.state.imgToSend1,
        this.state.imgToSend2,
        this.state.imgToSend3
      );

      if (
        this.state.imgToSend1 != "" &&
        this.state.imgToSend2 != "" &&
        this.state.imgToSend3 != ""
      ) {
        if (this.state.payment == "Realizado") {
          try {
            await updateDoc(
              doc(db, "requests", auth.currentUser.uid),
              newStatus
            );
            alert("Estado del pedido actualizado");
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Por favor aseg??rate que el usuario haya realizado el pago");
        }
      } else {
        alert("Por favor subir todas las imagenes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    let currentUrl = {
      id: window.location.pathname.split("/")[3],
    };
    this.setState({ current: currentUrl });
    console.log(currentUrl);

    validateUser();
    const myTimeout = setTimeout(() => {
      try {
        getDoc(doc(db, "requests", currentUrl.id)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log(docSnap.data());
            this.setState({ business: docSnap.data().nombreEmprendimiento });
            this.setState({ id: docSnap.data().id });
            this.setState({ status: docSnap.data().estado });
            this.setState({ payment: docSnap.data().pago });

            this.setState({ name: docSnap.data().nombre });
            this.setState({ phone: docSnap.data().telefono });
            this.setState({ email: docSnap.data().email });
            this.setState({ businessSector: docSnap.data().sectorEconomico });

            this.setState({ perc1: docSnap.data().percep1_amable_autoritaria });
            this.setState({ perc2: docSnap.data().percep2_innovadora_clasica });
            this.setState({ perc3: docSnap.data().percep3_creativa_seria });
            this.setState({ perc4: docSnap.data().percep4_masiva_exclusiva });
            this.setState({
              perc5: docSnap.data().percep5_convencional_rebelde,
            });

            this.setState({ textoLogo: docSnap.data().brief_textoLogo });
            this.setState({ sloganLogo: docSnap.data().brief_sloganLogo });
            this.setState({ sectorEconomico: docSnap.data().sectorEconomico });
            this.setState({
              companiaAccion: docSnap.data().brief_companiaAccion,
            });
            this.setState({
              principalesProductosServicios:
                docSnap.data().brief_principalesProductosServicios,
            });
            this.setState({
              publicoObjetivo: docSnap.data().brief_publicoObjetivo,
            });
            this.setState({
              coloresRepresentativos:
                docSnap.data().brief_coloresRepresentativos,
            });
            this.setState({
              cosasRepresentativas: docSnap.data().brief_cosasRepresentativas,
            });
            this.setState({
              empresasCompetencia: docSnap.data().brief_empresasCompetencia,
            });
            this.setState({ masQueContar: docSnap.data().brief_masQueContar });
            this.setState({
              textoMayusMinusExactas:
                docSnap.data().brief_bool_textoMayusMinusExactas,
            });

            this.setState({ logoType: docSnap.data().logoType });
            this.setState({ typePreference: docSnap.data().typePreference });

            this.setState({ disenoTipo: docSnap.data().disenoTipo });
            this.setState({ planSize: docSnap.data().planSize });
            this.setState({ promoCode: docSnap.data().promoCode });
            
            docSnap.data().sinAnimoDeLucro ? this.setState({
              sinAnimoDeLucro: docSnap.data().sinAnimoDeLucro.toString(),
            }) : this.setState({sinAnimoDeLucro:''});

            docSnap.data().bool_wantsNotifEmail ? this.setState({
              wantsNotifEmail: docSnap.data().bool_wantsNotifEmail.toString(),
            }) : this.setState({wantsNotifEmail:''});
            
            docSnap.data().bool_wantsNotifEmail ? this.setState({
              wantsNotifWhatsapp: docSnap
                .data()
                .bool_wantsNotifWhatsapp.toString(),
            }) : this.setState({wantsNotifWhatsapp:''});
           
            docSnap.data().bool_wantsNotifSMS ? this.setState({
              wantsNotifSMS: docSnap.data().bool_wantsNotifSMS.toString(),
            }) : this.setState({wantsNotifSMS:''});
            
            docSnap.data().bool_acceptedMethodology ? this.setState({
              acceptedMethodology: docSnap
                .data()
                .bool_acceptedMethodology.toString(),
            }) : this.setState({acceptedMethodology:''});

            this.setState({
              revision: docSnap
                .data()
                .correccion
            });

            this.getImage("examplePics", "example1", "img1");
            this.getImage("examplePics", "example2", "img2");
            this.getImage("examplePics", "example3", "img3");

            this.getImage("propuestas", "propuesta1", "Pimg1");
            this.getImage("propuestas", "propuesta2", "Pimg2");
            this.getImage("propuestas", "propuesta3", "Pimg3");

            this.getAcceptedImage();
          } else {
          }
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }

  render() {
    return (
      <>
        <div>
          <h1>{this.state.business}</h1>
          <h4>Guardado con el id {this.state.id}</h4>
          <h4>
            Estado: {this.state.status} Pago: {this.state.payment}
          </h4>
        </div>
        <div>
          <h3>Nombre del cliente: {this.state.name}</h3>
          <h3>Telef??no: {this.state.phone}</h3>
          <h3>email: {this.state.email}</h3>
        </div>
        <div>
          <h2>Datos del pedido</h2>
          <h3>Sector econ??mico de la empresa: {this.state.businessSector}</h3>
          <div>
            <p>
              ??ndice amable-autoritaria(0 = m??s amable, 100 = m??s autoritaria):{" "}
            </p>{" "}
            <p>
              <b>{this.state.perc1}</b>
            </p>
            <p>
              ??ndice innovadora-cl??sica(0 = m??s innovadora, 100 = m??s cl??sica):{" "}
            </p>{" "}
            <p>
              <b>{this.state.perc2}</b>
            </p>
            <p>??ndice creativa-seria(0 = m??s creativa, 100 = m??s seria): </p>{" "}
            <p>
              <b>{this.state.perc3}</b>
            </p>
            <p>
              ??ndice masiva-exclusiva(0 = m??s masiva, 100 = m??s exclusiva):{" "}
            </p>{" "}
            <p>
              <b>{this.state.perc4}</b>
            </p>
            <p>
              ??ndice convencional-rebelde(0 = m??s convencional, 100 = m??s
              rebelde):{" "}
            </p>{" "}
            <p>
              <b>{this.state.perc5}</b>
            </p>
          </div>
          <div>
            <h4>Texto para el logo: {this.state.textoLogo}</h4>
            <h4>Slogan para el logo: {this.state.sloganLogo}</h4>
            <h4>
              Las may??sculas y min??sculas exactas:{" "}
              {this.state.textoMayusMinusExactas}
            </h4>
            <p>??A qu?? se dedica?: {this.state.companiaAccion}</p>
            <p>
              ??Cu??les son sus principales productos y servicios?:{" "}
              {this.state.principalesProductosServicios}
            </p>
            <p>??Cu??l es su p??blico objetivo?: {this.state.publicoObjetivo}</p>
            <p>Colores representativos: {this.state.coloresRepresentativos}</p>
            <p>Cosas representativas: {this.state.cosasRepresentativas}</p>
            <p>
              Empresas que son competencia: {this.state.empresasCompetencia}
            </p>
            <p>??Algo m??s que contar?: {this.state.masQueContar}</p>
          </div>
          <div>
            <h4>Tipo de logo: {this.state.logoType}</h4>
            <h4>Preferencia de tipograf??a: {this.state.typePreference}</h4>
          </div>
          <div>
            <h4>Tipo de dise??o: {this.state.disenoTipo}</h4>
            <h4>Tama??o del plan: {this.state.planSize}</h4>
            <h4>C??digo Promocional: {this.state.promoCode}</h4>
            <h4>??Es sin ??nimo de lucro?: {this.state.sinAnimoDeLucro}</h4>
          </div>
          <div>
            <p>
              Quiere notificaciones por correo: {this.state.wantsNotifEmail}
            </p>
            <p>
              Quiere notificaciones por WhatsApp:{" "}
              {this.state.wantsNotifWhatsapp}
            </p>
            <p>Quiere notificaciones por SMS: {this.state.wantsNotifSMS}</p>
            <p>Acept?? metodolog??a: {this.state.acceptedMethodology}</p>
          </div>
          <div className="exampleImages">
            <h2>Ejemplos</h2>
            <img src={this.state.img1} className="exampleImages-img" alt="" />
            <img src={this.state.img2} className="exampleImages-img" alt="" />
            <img src={this.state.img3} className="exampleImages-img" alt="" />
          </div>
          <div>
            <button onClick={this.updatePayment}>Pago Realizado</button>
          </div>
          <div className="proposalImages">
            <h2>Propuestas enviadas</h2>
            <img
              src={this.state.imgToSend1}
              className="proposalImages-img"
            ></img>
            <img
              src={this.state.imgToSend2}
              className="proposalImages-img"
            ></img>
            <img
              src={this.state.imgToSend3}
              className="proposalImages-img"
            ></img>
            <div>
              <p>Propuesta 1</p>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend1: event.target.files[0] });
                }}
                type="file"
              ></input>
            </div>
            <div>
              <p>Propuesta 2</p>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend2: event.target.files[0] });
                }}
                type="file"
              ></input>
            </div>
            <div>
              <p>Propuesta 3</p>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend3: event.target.files[0] });
                }}
                type="file"
              ></input>
            </div>
            <div>
              <button onClick={this.uploadImages}>Enviar Propuestas</button>
            </div>
          </div>
          {this.state.status == "Aceptado" ? (
            <div className="accepted-div">
              <h2>Propuesta Aceptada</h2>
              <img
                className="accepted-div-img"
                src={this.state.acceptedImage}
              ></img>
              <p>Subir Archivo AI</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "AIfile");
                }}
              ></input>
              <p>Subir Archivo PNG</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "PNGfile");
                }}
              ></input>
              <p>Subir colorimetr??a</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "Colorimetria");
                }}
              ></input>
              <p>Subir RRSS-Perfil</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "RRSSPe");
                }}
              ></input>
              <p>Subir RRSS-Portada</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "RRSSPo");
                }}
              ></input>
              <p>Subir Papel Tapiz</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "PT");
                }}
              ></input>
              <p>Subir Regalo</p>
              <input
                type="file"
                onChange={(event) => {
                  this.uploadData(event.target.files[0], "Gift");
                }}
              ></input>
            </div>
          ) : (
            <div></div>
          )}
          {this.state.status == "Enviado para Revisi??n" ? (
            <div className="revision-div">
              <h2>Propuesta para modificar</h2>
              <img
                className="revision-div-img"
                src={this.state.imgForRevision}
              ></img>
              <p>Aspectos a modificar: {this.state.revision}</p>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend1: event.target.files[0] });
                }}
                type="file"
              ></input>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend2: event.target.files[0] });
                }}
                type="file"
              ></input>
              <input
                onChange={(event) => {
                  this.setState({ imgToSend3: event.target.files[0] });
                }}
                type="file"
              ></input>
              <button onClick={this.uploadImages}>Enviar Propuestas</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div></div>
      </>
    );
  }
}
