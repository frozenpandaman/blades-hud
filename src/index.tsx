import React from "react";
import ReactDOM from "react-dom";
import Hud from "./Hud";
import * as firebase from "firebase/app";
import * as serviceWorker from "./serviceWorker";

var firebaseConfig = { // HARDCODED
    apiKey: "AIzaSyAh3eftn28WijpvsC3Zvgja-5TJgSYyKuE",
    authDomain: "blades-in-the-dark.firebaseapp.com",
    projectId: "blades-in-the-dark",
    storageBucket: "blades-in-the-dark.appspot.com",
    messagingSenderId: "850686563470",
    appId: "1:850686563470:web:456c497ef0c19beb5465df"
};
export const db_email = "eli@elifessler.com";
export const title = "blades in the dark oneshot w/ eli!"
export const oneshot = true;

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<Hud />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();