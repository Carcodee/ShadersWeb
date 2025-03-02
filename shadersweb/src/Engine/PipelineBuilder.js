
class PipelineBuilder{

    device;
    canvasFormat;
    vertexBufferLayout;
    shaderModule;

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
        this.shaderModuele = shaderModule;
    }

}