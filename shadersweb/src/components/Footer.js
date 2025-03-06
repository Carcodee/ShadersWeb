import React from "react";

function Footer() {
	return (
		<div style={styles.header}>
			Centennial College <br></br>Created by: Carloooos, Elizaveta, Kevin
		</div>
	);
}

export default Footer;

const styles = {
	header: {
		float: "top",
		background: "#00193d",
		padding: "0",
		height: "160px",
		textAlign: "center",
		alignContent: "center",
		fontSize: "1.4em",
	},
};
