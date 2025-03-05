
import { WgslReflect } from "wgsl_reflect/wgsl_reflect.module";

export class Shader{

    shaderCode;
    shaderModule;
    samplers = [];
    textures = [];
    storageImages = [];
    buffers = [];

    constructor(shaderCode) {
        this.shaderCode = shaderCode;
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
}