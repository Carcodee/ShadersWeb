import React from "react";
import { Editor } from "@monaco-editor/react";

function ShaderEditor({ shaderCode, handleShaderCode }) {
	return (
		<div style={styles.editorContainer}>
			<Editor
				height="100%"
				language="glsl"
				theme="vs-dark"
				value={shaderCode}
				onChange={handleShaderCode}
				options={{
					selectOnLineNumbers: true,
					automaticLayout: true,
				}}
			/>
		</div>
	);
}

const styles = {
	editorContainer: {
		width: "50%",
		border: "10px solid rgb(30, 30, 30)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: "10px",
		marginLeft: "10px",
	},
};

export default ShaderEditor;
