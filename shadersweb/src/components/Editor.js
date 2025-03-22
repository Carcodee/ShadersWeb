import React, { useEffect } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";

function ShaderEditor({ shaderCode, handleShaderCode }) {
  const monaco = useMonaco();
  
  useEffect(() => {
    if (!monaco) return;
    
    console.log("monaco is loaded");
    
    monaco.editor.defineTheme("glslCustomTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "569CD6" }, // for, if, while, return (blue)
        { token: "type", foreground: "4EC9B0" }, // types (blue-green)
        { token: "number", foreground: "B5CEA8" },  // Numbers (light green)
        { token: "comment", foreground: "6A9955" }, // Comments (green)
        { token: "string", foreground: "CE9178" }, // Strings (orange)
        { token: "delimiter.parenthesis", foreground: "FFD700" }, // () yellow
        { token: "delimiter.curly", foreground: "FF8C00" }, // {} orange
        { token: "delimiter.square", foreground: "9370DB" }, // [] purple
		{ token: "decorator", foreground: "9370DB" }, // Decorator (purple)
      ],
      colors: {
        "editor.foreground": "#FFFFFF",
        "editor.background": "#1E1E1E",
      },
    });
    
    monaco.languages.register({ id: "glsl" });
    
    monaco.languages.setMonarchTokensProvider("glsl", {
      tokenizer: {
        root: [
          [/\b(for|if|while|return|void|struct|fn)\b/, "keyword"],
          [/\b(float|vec2|vec3|vec4|mat4|sampler|texture_2d)|int|var\b/, "type"],
          [/\b\d+(\.\d+)?\b/, "number"],
          [/".*?"|'.*?'/, "string"],
          [/\/\/.*/, "comment"],
		  [/@\w+/, "decorator"],
          [/\(/, "delimiter.parenthesis.open"],
          [/\)/, "delimiter.parenthesis.close"],
          [/{/, "delimiter.curly.open"],
          [/}/, "delimiter.curly.close"],
          [/\[/, "delimiter.square.open"],
          [/\]/, "delimiter.square.close"],
        ],
      },
    });
    monaco.editor.setTheme("glslCustomTheme");
    
    console.log("GLSL Syntax Highlighting Applied!");
  }, [monaco]);
  
  return (
    <div style={styles.editorContainer}>
      <Editor
        height="100%"
        language="glsl"
        theme="glslCustomTheme"
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
    width: "60%",
    border: "10px solid rgb(30, 30, 30)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    marginLeft: "10px",
  },
};

export default ShaderEditor;