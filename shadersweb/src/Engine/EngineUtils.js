export const EngineUtils = {
    CreateBuffer(device, name, size, usage) {
        return device.createBuffer({
            label: name,
            size: size,
            usage: usage,
        });
    },

    CreateTexture(device, name, usage, format, width, height) {
        return device.createTexture({
            label: name,
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

};
