import React from 'react'
import { Link, useHistory } from "react-router-dom";

export default function PollList(props) {
    const polls = props.polls;

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
