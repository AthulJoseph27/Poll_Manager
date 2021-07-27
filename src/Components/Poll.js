import React, { useEffect, useState } from 'react'
import firebase, { firestore } from '../firebase';
import { Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProgressBar from './CustomProgressBar';
import { useAuth } from "../Context/AuthContext";
import NavBar from './NavBar';

export default function Poll() {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [error, setError] = useState("");
    const [option, setOption] = useState(-1);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const [optionList, setOptionList] = useState([]);
    const [optionDropDown, setOptionDropDown] = useState([]);

    useEffect(() => {
        var docRef = firestore.collection('polls').doc(id);
        docRef.onSnapshot((doc) => {
            var _poll = doc.data();
            setDetails(_poll);
            var temp = getOptionsList(_poll);
            setOptionList(temp);
            temp = getOptionDropDown(_poll);
            setOptionDropDown(temp);
        });
    }, [id]);

    function getOptionsList(dts) {
        var _list = [];
        var denominator = 0;

        for (let i = 0; i < dts.count; i++) {
            denominator += dts.voteCount[i.toString()];
        }
        for (let i = 0; i < dts.count; i++) {
            var percentage = denominator === 0 ? 0 : (dts.voteCount[i.toString()] * 100 / denominator);
            _list.push(
                <div className="mt-4 mb-4">
                    <label>{String.fromCharCode(65 + i) + "."}</label>
                    <h5>{dts.optionText[i]}</h5>
                    <ProgressBar key={i} bgcolor={"#00BFA6"} completed={percentage.toFixed(2)} />
                </div>
            );
        }
        console.log(_list);

        return _list;
    }

    function getOptionDropDown(dts) {
        var _list = [];
        for (let i = 0; i < dts.count; i++) {
            _list.push(
                <option value={i}>{String.fromCharCode(65 + i)}</option>
            );
        }
        _list.push(<option value="-1"></option>);
        console.log(_list);
        return _list;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!currentUser) {
            setError("Login to cast your vote!");
            return;
        }

        if (details.end < Date.now()) {
            setError("Poll has ended!");
            return;
        }

        if (option === -1) {
            setError("Invalid Option");
            return;
        }

        setLoading(true);

        try {
            var docRef = firestore.collection("Users").doc(currentUser.uid).collection("Votes").doc(details.id);
            var result = await docRef.get();
            if (!result.exists) {
                await docRef.set({ option: option });
                docRef = firestore.collection("polls").doc(details.id).update({
                    ["voteCount." + option.toString()]: firebase.firestore.FieldValue.increment(1)
                });
                setMessage("Vote has been added.");
            } else {
                setError("You can vote only once!");
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong!");
        }

        setLoading(false);
    }

    function getOptionSelect() {

        if (details.end < Date.now())
            return (<div></div>);

        return (
            <select
                value={option}
                onChange={(e) => setOption(e.target.value)}>
                {optionDropDown.map((item) => (item))}
            </select>
        );
    }

    function getVoteButton() {
        if (details.end < Date.now())
            return (<div></div>);

        return (
            <Button disabled={loading} type="submit">Vote</Button>
        );
    }

    return (
        <div>
            <NavBar />
            <p></p>
            <div className="create">
                <h1>{details.title}</h1>
                <form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    {optionList.map((item) => (item))}
                    {getOptionSelect()}
                    {getVoteButton()}
                </form>
            </div>
        </div>

    );
}
