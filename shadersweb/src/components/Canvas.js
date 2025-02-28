// import React from "react";

// import { CreateWebGPUCanvas } from "../Engine/Core";
// import { useEffect, useState } from "react";

// function CanvasWidget() {
// 	const canvasElement = useState(null);

// 	useEffect(() => {
// 		CreateWebGPUCanvas(800, 800).then((canvas) => {
// 			if (canvasElement.current) {
// 				canvasElement.current.appendChild(canvas);
// 			}
// 		});
// 	});

// 	return <div ref={canvasElement}></div>; // This will now show the actual canvas
// }

// export default CanvasWidget;
import React, { useEffect, useRef, useState } from "react";
import { CreateWebGPUCanvas } from "../Engine/Core";
import ShaderEditor from "./Editor";

function CanvasWidget() {
	const canvasElement = useRef(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [fps, setFps] = useState(0);
	const requestRef = useRef(null);
	const prevTimeRef = useRef(0);
	const frameCount = useRef(0);
	const [shaderCode, setShaderCode] = useState(`
		struct VertexOut{
                      @builtin(position) position: vec4f,
                      @location(0) col: vec4f,
                  };

                  @vertex
                      fn vertexMain(@location(0) pos: vec2f) ->
                      VertexOut {
                      var vertexOut: VertexOut;
                      vertexOut.position = vec4f(pos, 0, 1);
                      vertexOut.col = vec4f(pos, 1, 1);
                      return vertexOut;

                  }

                  @fragment
                      fn fragmentMain(inData: VertexOut) -> @location(0) vec4f {
                      return vec4f(inData.col);
                  }
	`);

	useEffect(() => {
		let canvasInstance;
		const canvasContainer = canvasElement.current; // Capture the current ref value

		CreateWebGPUCanvas(800, 800, shaderCode).then((canvas) => {
			canvasInstance = canvas;
			if (canvasContainer) {
				canvasContainer.appendChild(canvas);
			}
		});

		const updateFps = (time) => {
			if (prevTimeRef.current === 0) {
				prevTimeRef.current = time;
			}

			frameCount.current++;
			const deltaTime = time - prevTimeRef.current;

			if (deltaTime >= 1000) {
				setFps(Math.round((frameCount.current * 1000) / deltaTime));
				prevTimeRef.current = time;
				frameCount.current = 0;
			}

			if (isPlaying) {
				requestRef.current = requestAnimationFrame(updateFps);
			}
		};

		if (isPlaying) {
			requestRef.current = requestAnimationFrame(updateFps);
		}

		return () => {
			if (canvasInstance && canvasContainer) {
				canvasContainer.removeChild(canvasInstance);
			}
			cancelAnimationFrame(requestRef.current);
		};
	}, [isPlaying, shaderCode]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleShaderCode = (value) => {
		setShaderCode(value);
	}

	return (
		<div style={styles.container}>
			<div className="player-window" style={styles.playerWindow}>
				<div ref={canvasElement} style={styles.canvasContainer}></div>
				<div className="controls" style={styles.controls}>
					<button onClick={togglePlayPause}>
						{isPlaying ? "Pause" : "Play"}
					</button>
					<span style={styles.fpsCounter}>FPS: {fps}</span>
				</div>
			</div>
			<ShaderEditor shaderCode={shaderCode} handleShaderCode={handleShaderCode}/>
		</div>
	);
}

const styles = {
	container: {
		display: "flex",
		justifyContent: "space-between",
		height: "100vh",
	},
	playerWindow: {
		border: "2px solid #333",
		borderRadius: "8px",
		overflow: "hidden",
		width: "800px",
		height: "830px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	canvasContainer: {
		flex: 1,
	},
	controls: {
		padding: "10px",
		backgroundColor: "#222",
		color: "#fff",
		textAlign: "center",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	fpsCounter: {
		marginLeft: "10px",
		fontSize: "14px",
	},
};

export default CanvasWidget;
