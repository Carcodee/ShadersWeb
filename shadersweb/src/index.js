import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CanvasWidget from "./components/Canvas";

const App = () => {
	const [showCanvas, setShowCanvas] = useState(false);

	const toggleCanvas = () => {
		setShowCanvas(!showCanvas);
	};
	return (
		<>
			<Header />
			<main>
				<Home />
				<button onClick={toggleCanvas} style={styles.miniview}>
					Smiley Face
				</button>
				<div className="mini-view">{showCanvas && <CanvasWidget />}</div>
			</main>
			<Footer />
		</>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const styles = {
	miniview: {
		background: "#FFFFFF",
		width: "20%",
		height: "10%",
		border: "none",
	},
};
