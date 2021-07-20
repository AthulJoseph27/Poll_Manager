import React from 'react'
import { Link, useHistory } from "react-router-dom";
import './PollDetails';

export default function PollList(props) {
    const polls = props.polls
    console.log(polls);
    return (
        <div className="content">
            {polls.map((poll) => (
                <div className="poll-preview" key={poll.id}>
                    <Link
                        to={{
                            pathname: `/poll/${poll.id}`,
                            state: [poll]
                        }}>
                        <h2>{poll.title}</h2>
                        <p>{poll.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
