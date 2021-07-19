import React, { useRef, useState } from 'react';
import PollList from './PollList';
import NavBar from './NavBar';

export default function FinishedPolls() {
    const [polls, setPolls] = useState([
        { title: "poll-1", link: "", author: "Team Spiderman", id: 1 },
        { title: "poll-2", link: "", author: "Team Spidy", id: 2 }
    ]);
    return (
        <div>
            <NavBar />
            <div>
                <PollList polls={polls} />
            </div>
        </div>
    );
}
