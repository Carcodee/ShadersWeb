
import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module";
import {BindGroupBuilder} from "./BindGroupBuilder";
import {ResourceManager} from "./RenderGraph";

export class Shader{

    internalShaderCode;
    shaderCode;
    shaderModule;
    samplers = [];
    textures = [];
    storageImages = [];
    buffers = [];
    bindGroupObject = {};

    constructor(shaderCode) {
        this.shaderCode = shaderCode;
        this.internalShaderCode =
            `
struct VertexIn {
    @location(0) pos: vec2f,
    @location(1) uv: vec2f,
};
struct VertexOut {
    @builtin(position) position: vec4f,
    @location(1) uv: vec2f,
};
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
	`
    }

    AddResourceToCode(){
        //do some parsing to add the code to the existing shader code;
    }

    ReflectCode(){
        const reflect = new WgslReflect(shaderCode);
        for (const sampler of reflect.samplers) {
            this.samplers.push({name: sampler.name, binding: sampler.binding, group: sampler.group})
        }
        for (const texture of reflect.textures) {
            this.textures.push({name: texture.name, binding: texture.binding, group: texture.group})
        }
        for (const storageImage of reflect.storage) {
            this.storageImages.push({name: storageImage.name, binding: storageImage.binding, group: storageImage.group})
        }
        for (const buffer of reflect.uniforms) {
            this.buffers.push({name: buffer.name, binding: buffer .binding, group: buffer .group})
        }
    }

    Create(resManager){
        this.shaderModule = resManager.device.createShaderModule({
            label: "Base Shader",
            code: this.shaderCode,
        });
        const bindGroupBuilder = new BindGroupBuilder();
        for (const sampler of this.samplers) {
            bindGroupBuilder.AddSampler(sampler.binding, GPUShaderStage.FRAGMENT, resManager.GetSampler("default-sampler", "linear", "linear"));
        }
        for (const sampler of this.samplers) {
            bindGroupBuilder.AddSampler(sampler.binding, GPUShaderStage.FRAGMENT, resManager.GetSampler("default-sampler", "linear", "linear"));
        }
        for (const sampler of this.samplers) {
            bindGroupBuilder.AddSampler(sampler.binding, GPUShaderStage.FRAGMENT, resManager.GetSampler("default-sampler", "linear", "linear"));
        }
        for (const sampler of this.samplers) {
            bindGroupBuilder.AddSampler(sampler.binding, GPUShaderStage.FRAGMENT, resManager.GetSampler("default-sampler", "linear", "linear"));
        }
    }
}

