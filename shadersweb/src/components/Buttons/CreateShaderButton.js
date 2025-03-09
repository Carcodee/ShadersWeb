import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/CreateShaderButton.css'


export default function CreateShaderButton() {
    const navigate = useNavigate();
    const goToShaderPage = () => {
		navigate('/shader');
	};
    return (
        <button className="createShaderButton" onClick={goToShaderPage}>
            Create Shader
        </button>
    );
}
