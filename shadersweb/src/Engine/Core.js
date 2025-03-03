﻿
import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module";
import { EngineUtils } from "./EngineUtils";
import { Device } from "./Device";
import { BindGroupBuilder } from "./BindGroupBuilder";


export async function CreateWebGPUCanvas (width, height, shaderCode){

    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const webDevice = new Device();
    await webDevice.Init();

    const device = webDevice.device;

    const context = canvas.getContext("webgpu");
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure(
        {
            device: device,
            format: canvasFormat,
        }
    )

    const reflect = new WgslReflect(shaderCode);

    const vertices = new Float32Array([
        // Position     // UV
        -1.0, -1.0,     0.0, 1.0,  // Bottom-left
        1.0, -1.0,     1.0, 1.0,  // Bottom-right
        1.0,  1.0,     0.0, 1.0,  // Top-right

        -1.0, -1.0,     0.0, 1.0,  // Bottom-left (second triangle)
        1.0,  1.0,     1.0, 1.0,  // Top-right
        -1.0,  1.0,     0.0, 0.0,  // Top-left
    ]);

    const vertexBuffer = EngineUtils.CreateBuffer(device, "Cell vertices", vertices.byteLength, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);

    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    const vertexBufferLayout = {
        arrayStride: 16,
        attributes: [
            {format: "float32x2", offset: 0, shaderLocation: 0,},
            {format: "float32x2", offset: 0, shaderLocation: 1,},
        ]
    };

    const ShaderModule = device.createShaderModule({
        label: "Base Shader",
        code: shaderCode,
    });

    const bufferSize = 4 * 4; //vec4
    const uniformBuffer = EngineUtils.CreateBuffer(device, "BufferTest", bufferSize, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);

    const data = new Float32Array([1.0, 0.5, 1.0, 1.0]);

    device.queue.writeBuffer(uniformBuffer, 0, data);

    const sampler = device.createSampler({
        magFilter: "linear",
        minFilter: "linear",
    });
    const textureObj = await EngineUtils.LoadTexture(device, "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/800px-Happy_smiley_face.png");


    const bindGroupBuilder = new BindGroupBuilder();
    bindGroupBuilder
        .AddBuffer(0, GPUShaderStage.FRAGMENT, { type: "uniform" },{ buffer : uniformBuffer})
        .AddImage(1, GPUShaderStage.FRAGMENT, textureObj.textureView)
        .AddSampler(2, GPUShaderStage.FRAGMENT, sampler);

    const bindGroupObj = bindGroupBuilder.Build(device);


    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupObj.BindGroupLayout]
    });


    const Pipeline = device.createRenderPipeline({
        label: "Graphics Pipeline",
        layout: pipelineLayout,
        vertex: {
            module: ShaderModule,
            entryPoint: "vertexMain",
            buffers: [vertexBufferLayout]
        },
        fragment: {
            module: ShaderModule,
            entryPoint: "fragmentMain",
            targets: [{
                format: canvasFormat
            }],
        }
    })
    const encoder = device.createCommandEncoder();
    const renderPass = encoder.beginRenderPass(
        {
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue: {r: 0, g: 0, b: 0.4, a:1},
            }],
        }
    )

    renderPass.setPipeline(Pipeline);
    renderPass.setBindGroup(0, bindGroupObj.bindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(6);

    renderPass.end();
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    return canvas;
}