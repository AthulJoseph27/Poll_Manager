import React from 'react'
import { useParams } from 'react-router-dom';

export default function Poll() {
    const { id } = useParams();

    return (
        <div>
            <h2>Poll {id}</h2>

        </div>
    );
}
