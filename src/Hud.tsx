import React from "react";
import SignIn from "./SignIn";
import Pages from "./Pages";
import Tools from "./Tools";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
                        <div className="tc mv3">
                            <span className="pl1 pr1">i am:</span>
                            <select value={this.state.current_player} onChange={this.change_player}>
                                { players.slice(2).map( player => {
                                    return <option value={player}>{player}</option>
                                }) }
                            </select>
                        </div>
                        <div className="mv1 bb"></div>
                        <Tools/>
                        <div className="mb3 bb"></div>
                        <p className="b f6 tc">
                            <form onSubmit={this.signOut}>
                                <input type="submit" value="sign out" />
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
