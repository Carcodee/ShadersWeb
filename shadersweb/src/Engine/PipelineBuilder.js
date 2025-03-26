
export class PipelineBuilder{

    vertexBufferLayout;
    shaderModule;
    pipelineLayout;
    colorAttachmentTargets = [];

    constructor() {
    }
    SetVertexBufferLayout(vertexBufferLayout){
        this.vertexBufferLayout = vertexBufferLayout;
        return this;
    }
    SetShaderModule(shaderModule){
        this.shaderModule = shaderModule;
        return this;
    }
    SetPipelineLayout(pipelineLayout){
        this.pipelineLayout = pipelineLayout;
        return this;
    }
    AddColorAttachmentTarget(colorAttachmentTarget){
        this.colorAttachmentTargets.push(colorAttachmentTarget);
        return this;
    }

    Build(device){

        return device.createRenderPipeline({
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
    }


}