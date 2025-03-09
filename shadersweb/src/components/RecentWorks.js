import React from "react";

function RecentWorks() {
	return (
		<div style={styles.container}>
			<h2 style={styles.titleBar}>Recent Works</h2>
			<div style={styles.shaderContainer}>
				<div style={styles.miniShader}>shader 1</div>
				<div style={styles.miniShader}>shader 2</div>
				<div style={styles.miniShader}>shader 3</div>
			</div>
		</div>
	);
}

export default RecentWorks;
const styles = {
	container: {
		display: "flex",
		flexDirection: "column", // Stack title bar on top and shaders below
		marginTop: "20px",
		height: "40vh",
		background: "rgba(250, 250, 250, 0.69)",
		width: "80vw",
		margin: "auto",
		borderRadius: "5px",
	},
	titleBar: {
		height: "4vh",
		background: "black",
		color: "white",
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "5px 5px 0 0",
		marginTop: "0",
	},
	shaderContainer: {
		display: "flex",
		flexDirection: "row", // Align shaders horizontally
		flexWrap: "wrap", // Allow wrapping if needed
		justifyContent: "space-between",
		padding: "1vw",
	},
	miniShader: {
		background: "white",
		borderRadius: "5px",
		color: "black",
		minWidth: "100px",
		textAlign: "center",
		width: "20vw",
		height: "30vh",
	},
};
