
class BindGroupBuilder{
    bindGroupLayoutEntries = []
    bindGroupEntries = []
    bindGroupLayout;
    bindGroup;

    constructor() {
    }
    AddBuffer(binding, visibility, bufferType, buffer){
        this.bindGroupLayoutEntries.push({binding: binding, visibility: visibility, buffer:  bufferType})
        this.bindGroupEntries.push({binding: binding, resource: {buffer: buffer}})
    }
    AddImage(binding, visibility, textureView){
        this.bindGroupLayoutEntries.push({binding, visibility, texture : {}})
        this.bindGroupEntries.push({binding: binding, resource: textureView})
    }
    AddSampler(binding, visibility, sampler){
        this.bindGroupLayoutEntries.push({binding, visibility, sampler : {}})
        this.bindGroupEntries.push({binding: binding, resource: sampler})
    }
    Build(device){

        this.bindGroupLayout = device.createBindGroupLayout({
            entries: this.bindGroupLayoutEntries,
        })

        this.bindGroup = device.createBindGroup({
            layout: this.bindGroupLayout,
            entries: this.bindGroupEntries,
        })
    }

}