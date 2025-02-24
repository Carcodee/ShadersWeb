
export async function CreateWebGPUCanvas (width, height){

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

    const vertices = new Float32Array([
        //   X,    Y,
        -0.8, -0.8, // Triangle 1 (Blue)
        0.8, -0.8,
        0.8,  0.8,

        -0.8, -0.8, // Triangle 2 (Red)
        0.8,  0.8,
        -0.8,  0.8,
    ]);

    const vertexBuffer = device.createBuffer({
        label: "Cell vertices",
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

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
        code: `

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
          `

    });

    const Pipeline = device.createRenderPipeline({
        label: "Graphics Pipeline",
        layout: "auto",
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
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(vertices.length/2);

    renderPass.end();
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    return canvas;
}