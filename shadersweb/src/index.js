import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CanvasWidget from "./components/Canvas";
import BackHomeButton from "./components/Buttons/BackHomeButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainPage = () => {
	return (
		<>
			<Header />
			<main>
				<Home />
			</main>
			<Footer />
		</>
	);
};
const ShaderPage = () => {
	return (
		<>
			<Header />
			<main>
				<div className="shader-page-container" style={styles.ShaderPage}>
					<CanvasWidget />
					<BackHomeButton />
				</div>
			</main>
			<Footer />
		</>
	);
};
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/shader" element={<ShaderPage />} />
			</Routes>
		</BrowserRouter>
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
	ShaderPage: {
		width: "100%",
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		background: "#f5f5f5",
	},
};
