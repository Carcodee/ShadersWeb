import React from "react";
import CreateShaderButton from "./Buttons/CreateShaderButton";

function Home() {
	return (
		<div style={styles.homePage}>
			<h1 style={styles.title}>Shaders-Web++</h1>
			<h3 style={styles.subtitle}>Why did we create Shaders-Web?</h3>
			<p style={styles.paragraph}>
				To learn and share! We wanted to create an interactive platform that
				allowed users to create their own unique shaders.
			</p>
			<CreateShaderButton />
		</div>
	);
}

export default Home;

const styles = {
	homePage: {
		background: "rgb(195, 195, 195)",
		height: "95vh",
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
	},
};
