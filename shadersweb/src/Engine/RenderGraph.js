import {exp} from "three/tsl";

export class ResourceManager{
    textures= []
    storageImages= []
    samplers= []
    buffers= []

}
export class RenderNode{

    name;
    device;
    shaderCode;

    pipeline;
    bindGroupObj;

    constructor(device) {
        this.device = device;
    }
    SetShaderCode(shaderCode){
        this.shaderCode;
    }
    Build(){



    }
    ExecuteNode(){

    }

}
export class RenderGraph{

    device;
    renderNodes = {};
    currentEncoder;
    constructor(device) {
        this.device = device;
    }
    AddPass(name){
        if (name in this.renderNodes){
            return this.renderNodes[name];
        }

        const renderNode = new RenderNode(this.device);
        this.renderNodes[name] = renderNode;

    }
    BeginFrame(){
        this.currentEncoder =this.device.createCommandEncoder();
    };

    EndFrame(){

        const commandBuffer = this.currentEncoder.finish();
        this.device.queue.submit([commandBuffer]);
    }

}
