
export class BindGroupBuilder{
    bindGroupLayoutEntries = []
    bindGroupEntries = []

    constructor() {
    }
    AddBuffer(binding, visibility, bufferType, buffer){
        this.bindGroupLayoutEntries.push({binding: binding, visibility: visibility, buffer:  bufferType})
        this.bindGroupEntries.push({binding: binding, resource:  buffer})
        return this;
    }
    AddImage(binding, visibility, textureView){
        this.bindGroupLayoutEntries.push({binding, visibility, texture : {}})
        this.bindGroupEntries.push({binding: binding, resource: textureView})
        return this;
    }
    AddSampler(binding, visibility, sampler){
        this.bindGroupLayoutEntries.push({binding, visibility, sampler : {}})
        this.bindGroupEntries.push({binding: binding, resource: sampler})
        return this;
    }
    Reset(){
        this.bindGroupLayoutEntries = [];
        this.bindGroupEntries = [];
    }
    Build(device){

        const bindGroupLayout = device.createBindGroupLayout({
            label: "Bind Group Layout",
            entries: this.bindGroupLayoutEntries,
        })

        const bindGroup = device.createBindGroup({
            label: "Bind Group",
            layout: bindGroupLayout,
            entries: this.bindGroupEntries,
        })

        this.Reset();

        return {BindGroupLayout: bindGroupLayout, bindGroup: bindGroup};
    }

}