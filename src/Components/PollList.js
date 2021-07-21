import React from 'react'
import { Link } from "react-router-dom";
import './PollDetails';

export default function PollList(props) {
    const polls = props.polls
    console.log(polls);
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
