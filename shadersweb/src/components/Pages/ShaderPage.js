import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import CanvasWidget from "../Canvas";
import BackHomeButton from "../Buttons/BackHomeButton";
import "./styles/ShaderPage"


const ShaderPage = () => {
	return (
		<>
			<Header />
			<main>
				<div className="shader-page-container">
		  			<CanvasWidget />
		  			<BackHomeButton/>
				</div>
			</main>
            <Footer />
		</>
	);
}

export default ShaderPage;