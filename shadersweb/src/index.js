import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CanvasWidget from "./components/Canvas";
import Header from "./components/Header";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<Header />
		<div>
			<CanvasWidget />
		</div>
		<Footer />
	</>
);
