import React from 'react';
import NavBar from './NavBar';
import '../styles.css';
import pieChart from '../assets/pieChart.svg';
import report from '../assets/report.svg';
import { Container } from "react-bootstrap";

export default function Home() {
    var choice = Math.floor(Math.random() * 10) % 2;
    var displayImage = choice === 0 ? pieChart : report;
    return (
        <div>
            <NavBar />
            <h1 style={{ fontSize: "3em", textAlign: "center", marginTop: "50px", }}>Live Polling</h1>
            <div>
                <img
                    src={displayImage}
                    alt="Home"
                    style={
                        {
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
                            width: "30%"
                        }} />
                <Container style={{ width: "50%" }}>
                    <h6 style={{ fontSize: "1.5em", textAlign: "center", marginTop: "50px", color: "#48486e" }}>Regardless of whether it's a short survey with friends or solving an eternal discussion in your message board - BlitzPolls helps you to find the answer quickly and easily. Or have you always wanted to know what your followers really think? You can create a poll here in seconds. We also offer a poll management tool that requires a login, but that's not a must in order to use BlitzPolls. The best thing about BlitzPolls: All polling functions and the dashboard are 100% free.</h6>
                </Container>
                <Container style={{ width: "100%", height: "150px" }}></Container>
                <div>
                    <div className="rectangle"></div>
                    <div className="trapezium"></div>
                </div>
            </div>
        </div>
    );
}
