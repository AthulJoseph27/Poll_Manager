import React from 'react'
import { Link } from "react-router-dom";
import './PollDetails';
import no_data from '../assets/noData.svg';

export default function PollList(props) {
    const polls = props.polls;
    const title = props.title;
    if (polls.length === 0)
        return (
            <div>
                <img
                    src={no_data}
                    alt={title}
                    style={
                        {
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
                            width: "20%"
                        }} />
                <h1 style={{ textAlign: "center", marginTop: "50px", }}>{"No " + title + " !"}</h1>
            </div>
        );

    return (
        <div className="content">
            {polls.map((poll) => (
                <div className="poll-preview" key={poll.id}>
                    <Link to={`/poll/${poll.id}`}>
                        <h2>{poll.title}</h2>
                        <p>{poll.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
