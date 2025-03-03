
class PipelineBuilder{

    device;
    canvasFormat;
    vertexBufferLayout;
    shaderModule;
    pipelineLayout;
    colorAttachmentTargets = []

    PipelineBuilder(device){
        this.device = device;
    }
    SetCanvasFormat(canvasFormat){
        this.canvasFormat = canvasFormat;
    }
    SetVertexBufferLayout(vertexBufferLayout){
        this.vertexBufferLayout = vertexBufferLayout;
    }
    SetShaderModule(shaderModule){
        this.shaderModule = shaderModule;
    }
    SetPipelineLayout(pipelineLayout){
        this.pipelineLayout = pipelineLayout;
    }

    Build(device){

        const pipeline = device.createRenderPipeline({
            label: "Graphics Pipeline",
            layout: this.pipelineLayout,
            vertex: {
                module: this.shaderModule,
                entryPoint: "vertexMain",
                buffers: [this.vertexBufferLayout]
            },
            fragment: {
                module: this.shaderModule,
                entryPoint: "fragmentMain",
                targets: this.colorAttachmentTargets,
            }
        });
        return pipeline;
    }


}