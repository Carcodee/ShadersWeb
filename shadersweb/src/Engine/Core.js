
import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module";


function CreateBuffer(device, name, size, usage){
    return device.createBuffer({
        label: name,
        size: size,
        usage: usage,
    });
}

function CreateTexture(device,width, height, format, usage){
    return device.createTexture({
        size: [width, height, 1],
        format: format,
        usage: usage,
    });
}
async function LoadTexture(device, url){
    const img = new Image();
    img.src = url;
    await img.decode();

    const imageBitmap = await createImageBitmap(img);

    const texture = CreateTexture(device,
                                  img.width,
                                  img.height,
                                  "rgba8unorm",
                                  GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT)

    device.queue.copyExternalImageToTexture(
        {source: imageBitmap},
        {texture: texture},
        [imageBitmap.width, imageBitmap.height, 1]);

    return texture;

}

export async function CreateWebGPUCanvas (width, height, shaderCode){

    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if (!navigator.gpu) {
        throw new Error("WebGPU not supported on this browser.");
    }
    const adapter = await navigator.gpu.requestAdapter();
    if(!adapter){
        throw new Error("No appropiate gpu adapter found.");
    }
    const device = await adapter.requestDevice();
    if (!device) {
        throw new Error("No appropiate device.");
    }
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
        -0.8, -0.8,
        0.8, -0.8,
        0.8,  0.8,

        -0.8, -0.8,
        0.8,  0.8,
        -0.8,  0.8,
    ]);

    const vertexBuffer = CreateBuffer(device, "Cell vertices", vertices.byteLength, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);

    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    const vertexBufferLayout = {
        arrayStride: 8,
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0,
        }]
    };

    const ShaderModule = device.createShaderModule({
        label: "Base Shader",
        code: shaderCode,
    });

    const bufferSize = 4 * 4; //vec4
    const uniformBuffer = CreateBuffer(device, "BufferTest", bufferSize, GPUBufferUsage.UNIFORM, GPUBufferUsage.COPY_DST);

    const data = new Float32Array([1.0, 0.5, 1.0, 1.0]);

    const bindGroupLayout = device.createBindGroupLayout({
        entries: [{
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: { type: "uniform" },
        }],
    })

    const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{
            binding: 0,
            resource: { buffer: uniformBuffer},
        }],
    })


    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout]
    });

    device.queue.writeBuffer(uniformBuffer, 0, data);

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
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(vertices.length/2);

    renderPass.end();
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    return canvas;
}