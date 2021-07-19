import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { firestore } from '../firebase';

export default function CreateNewPoll() {
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(4);
    const [optionText, setOptionText] = useState(new Array(26));
    const [activeTimeUnit, setActiveTimeUnit] = useState('min');
    const [activeTimeValue, setActiveTimeValue] = useState(5);

    function getOptionsList() {
        var _list = [];
        for (let i = 0; i < count; i++) {
            _list.push(
                <div className="mt-4 mb-4">
                    <label>{String.fromCharCode(65 + i) + "."}</label>
                    <input
                        value={optionText[i]}
                        onChange={(e) => {
                            let newState = [...optionText];
                            newState[i] = e.target.value;
                            setOptionText(newState);
                        }}
                        type="text"
                        required />
                </div>
            );
        }

        return _list;
    }

    function getOptionDropDown() {
        var _list = [];
        for (let i = 2; i <= 26; i++) {
            _list.push(
                <option value={i}>{i}</option>
            );
        }
        return _list;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        var start = Date.now();
        var addTime = 0;

        if (activeTimeUnit === 'min')
            addTime = activeTimeValue * 60 * 1000;
        else if (activeTimeUnit === 'hour')
            addTime = activeTimeValue * 60 * 60 * 1000;
        else
            addTime = activeTimeValue * 24 * 60 * 60 * 1000;

        var end = start + addTime;
        var voteCount = [];
        var optionTitles = [];
        for (let i = 0; i < count; i++)
            voteCount.push(0);
        for (let i = 0; i < count; i++)
            optionTitles.push(optionText[i]);


        const poll = { start: start, end: end, count: count, title: title, optionText: optionTitles, voteCount: voteCount };

        var newDoc = firestore.collection('polls').doc();

        await newDoc.set(poll);
    }

    return (
        <div className="create">
            <h1>Create New Poll</h1>
            <form onSubmit={handleSubmit}>
                <label>Poll title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Option Count</label>
                <select value={count} onChange={(e) => setCount(e.target.value)}>
                    {getOptionDropDown().map((item) => (item))}
                </select>
                <label>Duration</label>
                <input
                    className="w-50"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    value={activeTimeValue}
                    onChange={(e) => {

                        setActiveTimeValue(e.target.value)
                    }} />
                <select value={activeTimeUnit} onChange={(e) => setActiveTimeUnit(e.target.value)}>
                    <option value="min">{activeTimeValue > 1 ? "minutes" : "minute"}</option>
                    <option value="hour">{activeTimeValue > 1 ? "hours" : "hour"}</option>
                    <option value="day">{activeTimeValue > 1 ? "days" : "day"}</option>
                </select>
                {getOptionsList().map((item) => (item))}
                <Button type="submit">Create Poll</Button>
            </form>
        </div>
    );
}
