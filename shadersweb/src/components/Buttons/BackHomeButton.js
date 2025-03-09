import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/BackHomeButton.css'


export default function BackHomeButton() {
    const navigate = useNavigate();
    const goToHomePage = () => {
		navigate('/');
	};
    return <button className="backHomeButton" onClick={goToHomePage}>Home</button>
}
