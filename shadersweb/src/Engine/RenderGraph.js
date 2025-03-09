import { EngineUtils } from "./EngineUtils";
import {EngineObjects} from "./EngineObjects";

export class ResourceManager{

    constructor(core) {
        this.core = core;
        this.device = this.core.device;
        this.texturesView= {}
        this.textures= {}
        this.storageImages= {}
        this.samplers= {}
        this.buffers= {}
    }

    GetTexture(name, usage, format, width, height){
        const id = Object.keys(this.textures);
        this.textures[id] = new EngineObjects.TextureObj(this.device, name, usage, format, width, height,id);
        return this.textures[id];
    }
    GetTextureView(texture){
        this.texturesView[texture.id] =  new EngineObjects.TextureViewObj(texture);
        return this.texturesView[texture.id];
    }
    GetTextureAndView(name, usage, format, width, height){
        const texture = this.GetTexture(name, usage, format, width, height);
        const view = this.GetTextureView(texture);
        return {texture, view};
    }
    GetBuffer(name, usage, size){
        const id = Object.keys(this.buffers);
        this.buffers[id] = new EngineObjects.BufferObj(this.device, name, size, usage, id);
        return this.buffers[id];
    }

    CreateDefaultResources(){

    }


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
