import React from "react";

function Home() {
	return (
		<div style={styles.homePage}>
			<h1 style={styles.title}>Shaders-Web++</h1>
		</div>
	);
}

export default Home;

const styles = {
	homePage: {
		background: "rgb(166, 158, 158)",
		height: "95vh",
		width: "95vw",
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
		fontFamily: "Helvetica",
	},
};
