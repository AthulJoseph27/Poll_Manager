import React, { useRef, useState } from 'react';
import PollList from './PollList';
import NavBar from './NavBar';
import '../styles.css';

export default function Home() {
    const [polls, setPolls] = useState([
        { title: "poll-1", link: "", author: "Team Ironman", id: 1 },
        { title: "poll-2", link: "", author: "Team Cap", id: 2 }
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
