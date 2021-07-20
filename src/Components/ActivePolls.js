import React, { useEffect, useState } from 'react';
import PollList from './PollList';
import NavBar from './NavBar';
import { firestore } from '../firebase';
import './PollDetails';

export default function ActivePolls() {
    const [polls, setPolls] = useState([]);
    const now = Date.now();

    useEffect(async () => {
        var result = await firestore.collection('polls').orderBy('end', 'asc').limit(10).get();
        var _list2 = [];
        result.docs.forEach((doc) => {
            if (doc.exists) {
                var poll = doc.data();
                if (poll.end < now)
                    return;
                _list2.push({ id: poll.id, title: poll.title, start: poll.start, end: poll.end, author: poll.author, optionCount: poll.count, options: poll.optionText, voteCount: poll.voteCount });

            }
        });
        setPolls(_list2);
    }, []);

    return (
        <div>
            <NavBar />
            <div>
                <PollList polls={polls} />
            </div>
        </div>
    );
}

