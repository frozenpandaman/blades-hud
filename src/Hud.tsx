import React from "react";
import SignIn from "./SignIn";
import Pages from "./Pages";
import Tools from "./Tools";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import injectStyle from './injectStyle';

const players = ["group", "world events", "milena", "avery"]; // HARDCODED

interface State {
    user: firebase.User | null;
    current_player: string;
    unsub_fns: Function[];
    db:firebase.firestore.Firestore;
}

class Hud extends React.PureComponent<{}, State> {
    constructor(props: {}) {
        super(props);

        const unsub_auth = firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
        });


        this.state = {
            user: null,
            current_player: players[2], // HARDCODED
            unsub_fns: [unsub_auth],
            db:firebase.firestore(),
        };

        this.change_player = this.change_player.bind(this);

        const keyframesStyle = `
            @-webkit-keyframes pulse {
                0%   { background-color: #10c018; }
                25%  { background-color: #1056c0; }
                50%  { background-color: #ef0a1a; }
                75%  { background-color: #254878; }
                100% { background-color: #04a1d5; }
            }
        `;
        injectStyle(keyframesStyle);
    }

    public componentWillUnmount() {
        for (const fn of this.state.unsub_fns) {
            fn();
        }
    }

    private change_player(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            current_player: e.currentTarget.value,
        });
    }

    private bg_reg(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        const bg = document.getElementById("lookatme")!;
        bg.style.webkitAnimation = "none";
        const txt = document.getElementById("backtoreg")!;
        txt.style.color = "black";
    }

    public signOut(event: React.ChangeEvent<HTMLFormElement>) {
        firebase.auth().signOut().catch((error) => {
            console.log(error.message);
        });
    }

    public render() {
        // if not signed in
        if (!this.state.user) {
            return (
            <div>
                <SignIn />
            </div>
            );
        } else { // if signed in
            return (
                <div className="flex">
                    <div className="flex flex-column w-80">
                        <Pages players={players} {...this.state} />
                    </div>
                    <div className="flex-column w-20 outline-l relative">
                        <div className="tc pv3" id="lookatme" style={{WebkitAnimation:"pulse 2s linear infinite"}}>
                            <span className="pl4 pr1" id="backtoreg" style={{color:"white"}}>i am:</span>
                            <select value={this.state.current_player} onChange={this.change_player}>
                                { players.slice(2).map( player => {
                                    return <option value={player}>{player}</option>
                                }) }
                            </select>
                            <a href="#!"
                            onClick={this.bg_reg}
                            className="pl2 pr2"
                            style={{color:"white", textDecoration:"none"}}>&#x2714;&#xfe0e;</a>
                        </div>
                        <div className="bb"></div>
                        <Tools/>
                        <div className="mb3 bb"></div>
                        <p className="b f6 tc">
                            <form onSubmit={this.signOut}>
                                <input type="submit" value="done playing" />
                            </form>
                        </p>
                        <div
                        className="f6 tc absolute"
                        style={{width:"100%", bottom:"4px", left:"50%", transform:"translateX(-50%)"}}>
                            last site update: 2/7/2021
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Hud;
