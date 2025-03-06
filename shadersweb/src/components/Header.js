import React from "react";

function Header() {
	return (
		<div style={styles.header}>
			<a style={styles.logo}>
				<img src="images/logo.png" alt="Logo" />
			</a>
		</div>
	);
}

export default Header;

const styles = {
	logo: {
		display: "block",
		float: "top",
	},
	header: {
		display: "block",
		float: "top",
		background: "#00193d",
		padding: "0",
		height: "110px",
	},
};
