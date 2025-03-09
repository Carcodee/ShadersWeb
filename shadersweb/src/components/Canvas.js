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
struct VertexIn {
    @location(0) pos: vec2f,
    @location(1) uv: vec2f,
};
struct VertexOut {
    @builtin(position) position: vec4f,
    @location(1) uv: vec2f,
};

struct Uniform{
	test: vec4f,
}

@group(0) @binding(0) var<uniform> uniformTest: Uniform;
@group(0) @binding(1) var myTexture: texture_2d<f32>;
@group(0) @binding(2) var mySampler: sampler;

@vertex
fn vertexMain(inData: VertexIn) -> VertexOut {
    var vertexOut: VertexOut;
    vertexOut.position = vec4f(inData.pos, 0, 1);
    vertexOut.uv = vec2f(inData.uv);
    return vertexOut;
}

@fragment
fn fragmentMain(inData: VertexOut) -> @location(0) vec4f { 
	
    return textureSample(myTexture, mySampler, inData.uv);
}

	`);

	useEffect(() => {
		let canvasInstance;
		const canvasContainer = canvasElement.current; // Capture the current ref value

		CreateWebGPUCanvas(750, 750, shaderCode).then((canvas) => {
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
	};

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
			<ShaderEditor
				shaderCode={shaderCode}
				handleShaderCode={handleShaderCode}
				style={styles.editor}
			/>
		</div>
	);
}

const styles = {
	editor: {
		paddingLeft: "10px",
	},
	container: {
		display: "flex",
		borderRadius: "5px",
		margin: "auto",
		width: "95%",
		justifyContent: "space-between",
		background: "rgb(166, 158, 158)",
		border: "5px rgb(166, 158, 158) solid",
	},
	playerWindow: {
		display: "block",
		overflow: "hidden",

		display: "flex",
		flexDirection: "column",
		borderRadius: "10px",
	},
	canvasContainer: {
		flex: 1,
	},
	controls: {
		padding: "10px",
		backgroundColor: "rgb(15, 15, 15)",
		color: "#fff",
		textAlign: "center",
		display: "flex",
		alignItems: "center",
	},
	fpsCounter: {
		marginLeft: "20px",
		fontSize: "14px",
	},
};

export default CanvasWidget;
