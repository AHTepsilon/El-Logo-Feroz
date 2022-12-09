import React, { Component } from "react";
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
import { getImage } from "../script/auth";
import "./styles/RequestPage.scss";

export default class RequestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headline: "",
      subtitle: "",
      isPending: true,
      img1: "",
      img2: "",
      img3: "",
      askedForModif: false,
      img1Selected: false,
      img2Selected: false,
      img3Selected: false,
      selectedImage: "",
      modification: "",
    };
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
            console.log(img);
          }

          if (img == "img2") {
            this.setState({ img2: url });
            console.log(img);
          }

          if (img == "img3") {
            this.setState({ img3: url });
            console.log(img);
          }
        })
        .catch((error) => {
          // Handle any errors
        });
    }, 2000);
  }

  async switchToggles(img) {
    if (img == "img1") {
      this.setState({ img1Selected: true });
      this.setState({ img2Selected: false });
      this.setState({ img3Selected: false });
    }
    if (img == "img2") {
      this.setState({ img1Selected: false });
      this.setState({ img2Selected: true });
      this.setState({ img3Selected: false });
    }
    if (img == "img3") {
      this.setState({ img1Selected: false });
      this.setState({ img2Selected: false });
      this.setState({ img3Selected: true });
    }
  }

  acceptImage = async (selectedImg1, selectedImg2, selectedImg3) => {
    try {
      if (selectedImg1) {
        let newImage = {
          imgToAccept: this.state.img1
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage).then(() => {
          window.location.href = '/AcceptPage'
        });
        
      }
      if (selectedImg2) {
        let newImage = {
          imgToAccept: this.state.img2
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage).then(() => {
          window.location.href = '/AcceptPage'
        });
      }
      if (selectedImg3) {
        let newImage = {
          imgToAccept: this.state.img3
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage).then(() => {
          window.location.href = '/AcceptPage'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendImageForRevision = async (selectedImg1, selectedImg2, selectedImg3) => {
    let newStatus = {
      estado: "Enviado para Revisión",
      correccion: this.state.modification,
    };

    let img1 = this.state.img1;
    let img2 = this.state.img2;
    let img3 = this.state.img3;

    console.log("statuses ", selectedImg1, selectedImg2, selectedImg3);
    console.log("images ", this.state.img1, this.state.img2, this.state.img3);
    try {
      if (selectedImg1) {
        let newImage = {
          imgToRevision: this.state.img1
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage);
      }
      if (selectedImg2) {
        let newImage = {
          imgToRevision: this.state.img2
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage);
      }
      if (selectedImg3) {
        let newImage = {
          imgToRevision: this.state.img3
        }
        await updateDoc(doc(db, "requests", auth.currentUser.uid), newImage);
      }

      await updateDoc(doc(db, "requests", auth.currentUser.uid), newStatus);
      alert("Logo enviado para revisión");
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    const timeout = setTimeout(() => {
      try {
        getDoc(doc(db, "requests", auth.currentUser.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().estado == "Pendiente") {
              this.setState({ headline: "EL LOGO FEROZ! ESTÁ DISEÑANDO" });
              this.setState({
                subtitle: "EN HASTA 72 HORAS TE NOTIFICAREMOS TU ENTREGA",
              });
            }
            if (docSnap.data().estado == "Esperando Respuesta") {
              this.setState({
                headline:
                  "TUS LOGOS ESTÁN LISTOS! ELIGE EL QUE PREFIERAS O REALIZA CAMBIOS",
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
        window.location.reload(false);
      }
    }, 2000);

    this.getImage("propuestas", "propuesta1", "img1");
    this.getImage("propuestas", "propuesta2", "img2");
    this.getImage("propuestas", "propuesta3", "img3");
  }

  render() {
    return (
      <>
        <div className="mainDiv">
          <h1 className="mainDiv-title">{this.state.headline}</h1>
          <div className="mainDiv-div">
              <img className="mainDiv-div-form-img" src={this.state.img1}></img>
              <input
                checked={this.state.img1Selected}
                onChange={(e) => {
                  this.switchToggles("img1");
                  (event) => {
                    this.setState({ img1Selected: !this.state.img1Selected });
                  };
                }}
                type="checkbox"
              ></input>
              <img className="mainDiv-div-form-img" src={this.state.img2}></img>
              <input
                checked={this.state.img2Selected}
                onChange={(e) => {
                  this.switchToggles("img2");
                  (event) => {
                    this.setState({ img2Selected: !this.state.img2Selected });
                  };
                }}
                type="checkbox"
              ></input>
              <img className="mainDiv-div-form-img" src={this.state.img3}></img>
              <input
                checked={this.state.img3Selected}
                onChange={(e) => {
                  this.switchToggles("img3");
                  (event) => {
                    this.setState({ img3Selected: !this.state.img3Selected });
                  };
                }}
                type="checkbox"
              ></input>
              <button
                  onClick={(e) => {
                    e.preventDefault;
                    this.acceptImage(
                      this.state.img1Selected,
                      this.state.img2Selected,
                      this.state.img3Selected
                    )}
                  }
              >
                ¡LO QUIERO! <br />
                (PODRÁS DESCARGAR LOS ARCHIVOS ORIGINALES)
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({ askedForModif: !this.state.askedForModif });
                }}
              >
                HACER MODIFICACIÓN <br />
                (TU PLAN TIENE 1 MODIFICACIÓN)
              </button>
            {this.state.askedForModif ? (
              <div>
                <h2>CUÉNTALE AL LOGO FEROZ TU MODIFICACIÓN</h2>
                <h3>EN HASTA 72 HORAS TE NOTIFICAREMOS LA RESPUESTA</h3>
                <textarea
                  onChange={(e) => {
                    this.setState({ modification: e.target.value });
                  }}
                ></textarea>
                <button
                  onClick={() =>
                    this.sendImageForRevision(
                      this.state.img1Selected,
                      this.state.img2Selected,
                      this.state.img3Selected
                    )
                  }
                >
                  ENVIAR
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </>
    );
  }
}
