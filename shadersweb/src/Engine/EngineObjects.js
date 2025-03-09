import { EngineUtils } from "./EngineUtils";
import { ResourceManager } from "./RenderGraph";

export const EngineObjects = {
    BufferObj : class {

        buffer;
        id = -1;
        constructor(device, name, size, usage, id) {
            this.buffer = EngineUtils.CreateBuffer(device, name, size, usage)
            this.id = id;
        }

    },

    TextureObj: class {

        texture;
        id = -1;
        constructor(device, name, usage, format, width, height, id) {
            this.texture = EngineUtils.CreateTexture(
                device,
                name,
                usage,
                format,
                width,
                height);
            this.id = id;
        }
    },
    TextureViewObj : class {
        textureObj;
        textureView;
        constructor(textureObj) {
            this.textureObj = textureObj;
            this.textureView = this.textureObj.texture.createView();
        }
    },

    ExternalTextureObj: class {
        url;
        name;
        id;
        textureObj;
        textureViewObj;
        constructor(url, name, id) {
            this.url = url;
            this.name = name;
            this.id = id;
        }
        async LoadTexture(resManager) {

            const imageBitmap = await EngineUtils.LoadImageBitmap(this.url);

            this.textureObj = resManager.GetTexture(
                this.name,
                GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
                "rgba8unorm",
                imageBitmap.width,
                imageBitmap.height)

            resManager.device.queue.copyExternalImageToTexture(
                { source: imageBitmap, flipY:true},
                { texture: this.textureObj.texture },
                [imageBitmap.width, imageBitmap.height, 1]
            );

            this.textureViewObj = resManager.GetTextureView(this.textureObj);
        }
    }
};
