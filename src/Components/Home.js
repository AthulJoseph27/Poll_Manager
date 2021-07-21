import React from 'react';
import NavBar from './NavBar';
import '../styles.css';
import street from '../assets/street.svg';

export default function Home() {
    return (
        <div>
            <NavBar />
            <div>
                <img
                    src={street}
                    alt="Home"
                    style={
                        {
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
                            width: "50%"
                        }} />
                <h1 style={{ textAlign: "center", marginTop: "50px", }}>Home</h1>
            </div>
        </div>
    );
}
