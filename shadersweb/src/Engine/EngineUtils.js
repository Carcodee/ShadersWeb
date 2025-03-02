export const EngineUtils = {
    CreateBuffer(device, name, size, usage) {
        return device.createBuffer({
            label: name,
            size: size,
            usage: usage,
        });
    },

    CreateTexture(device, width, height, format, usage) {
        return device.createTexture({
            size: [width, height, 1],
            format: format,
            usage: usage,
        });
    },
    async LoadImageBitmap(url) {
        const res = await fetch(url);
        const blob = await res.blob();
        return await createImageBitmap(blob, { colorSpaceConversion: 'none' });
    },
    async LoadTexture(device, url) {

        const imageBitmap = await this.LoadImageBitmap(url);

        const texture = this.CreateTexture(device,
            imageBitmap.width,
            imageBitmap.height,
            "rgba8unorm",
            GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT);

        device.queue.copyExternalImageToTexture(
            { source: imageBitmap, flipY:true},
            { texture: texture },
            [imageBitmap.width, imageBitmap.height, 1]
        );

        const textureView = texture.createView();

        return { texture, textureView };
    }
};
