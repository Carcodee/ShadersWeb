import React from "react";
import { Editor } from "@monaco-editor/react";

function ShaderEditor({ shaderCode, handleShaderCode}) {
    return (
        <div style={styles.editorContainer}>
            <Editor
                height="100%"
                language="glsl"
                value={shaderCode}
                onChange={handleShaderCode}
                options={{
                    selectOnLineNumbers: true,
                    theme: "vs-dark",
                    automaticLayout: true,
                }}
            />
        </div>
    )
}

const styles = {
	editorContainer: {
		width: "550px",
		padding: "20px",
		backgroundColor: "#f4f4f4",
		borderLeft: "2px solid #ccc",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginRight: "10px",
	}
};

export default ShaderEditor;
