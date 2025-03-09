import React from "react";
import CreateShaderButton from "./Buttons/CreateShaderButton";
import RecentWorks from "./RecentWorks";
function Home() {
	return (
		<div style={styles.homePage}>
			<h1 style={styles.title}>Shaders-Web++</h1>
			<h3 style={styles.subtitle}>What is Shaders-Web?</h3>
			<p style={styles.paragraph}>
				Shaders-Web is an interactive web platform built with ReactJS and WGSL.
				The goal was to allow users to create their own shaders and share it
				amongst others publically.
			</p>
			<h3 style={styles.subtitle}>Why did we create Shaders-Web?</h3>
			<p style={styles.paragraph}>
				To learn and share! We wanted to create an interactive platform that
				allowed users to create their own unique shaders.
			</p>
			<CreateShaderButton />
			<RecentWorks />
		</div>
	);
}

export default Home;

const styles = {
	homePage: {
		background: "rgb(240, 240, 240)",
		height: "110vh",
		width: "99vw",
		display: "block",
		margin: "auto",
		borderRadius: "5px",
	},
	title: {
		color: "black",
		textAlign: "center",
		fontSize: "75px",
		margin: "0",
		paddingTop: "5%",
		fontFamily: "Arial",
	},
	paragraph: {
		color: "black",
		textAlign: "center",
	},
	subtitle: {
		color: "black",
		textAlign: "center",
		paddingTop: "20px",
	},
};
