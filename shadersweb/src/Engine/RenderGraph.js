import { EngineUtils } from "./EngineUtils";
import {EngineObjects} from "./EngineObjects";
import {sampler} from "three/tsl";
import {Shader} from "./Shader";

export class ResourceManager{

    constructor(core) {
        this.core = core;
        this.device = this.core.device;

        this.texturesView= {}
        this.textures= {}
        this.storageImages= {}
        this.samplers= {}
        this.buffers= {}

        this.texNames = {};
        this.storageNames = {};
        this.samplersNames = {};
        this.buffersNames = {};
        this.CreateDefaultResources();
    }

    GetTexture(name, usage, format, width, height){
        const id = Object.keys(this.textures);
        this.textures[id] = new EngineObjects.TextureObj(this.device, name, usage, format, width, height,id);
        this.texNames[name] = id;
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
        this.buffersNames[name] = id;
        return this.buffers[id];
    }
    GetSampler(name, magFilter, minFilter){
        const id = Object.keys(this.samplers);
        this.samplers[id]= this.device.createSampler({
            magFilter: magFilter,
            minFilter: minFilter,
        });
        this.samplersNames[id] = name;
        return this.samplers[id];
    }

    GetTextureByName(name){
        if (name in this.texNames){
            return this.textures[this.texNames[name]];
        }
        if (name in this.storageNames){
            return this.storageImages[this.storageImages[name]];
        }
        console.log("Invalid name");
        return null;
    }
    GetBufferByName(name){
        if (name in this.buffersNames){
            return this.buffers[this.buffersNames[name]];
        }
        console.log("Invalid name");
        return null;
    }
    GetSamplerByName(name){
        if (name in this.samplersNames){
            return this.samplersNames[this.samplersNames[name]];
        }
        console.log("Invalid name");
        return null;
    }

    CreateDefaultResources(){
        this.GetBuffer("default-buffer", GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, 1);
        this.GetSampler("default-sampler", "linear", "linear");
        const texture = this.GetTexture(
            "default-texture",
            GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
            "rgba8unorm",
            256,
            256);
        const storageTexture = this.GetTexture(
            "default-storage",
            GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.STORAGE_BINDING,
            "rgba32float",
            256,
            256);
        this.GetTextureView(texture)
        this.GetTextureView(storageTexture)
    }


}
export class RenderNode{

    name;
    device;
    shaderCode;
    pipeline;
    bindGroupObj;
    shader;

    constructor(device) {
        this.device = device;
    }
    SetShaderCode(shaderCode){
        this.shaderCode = shaderCode;
    }
    Build(){
        this.shader = new Shader()


    }
    ExecuteNode(){

    }

}
export class RenderGraph{

    renderNodes = {};
    currentEncoder;

    constructor(core) {
        this.core = core;
        this.resManager =new ResourceManager(this.core);
    }
    AddPass(name){
        if (name in this.renderNodes){
            return this.renderNodes[name];
        }

        const renderNode = new RenderNode(this.core.device);
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
