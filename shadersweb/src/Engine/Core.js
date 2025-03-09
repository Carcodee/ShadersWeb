
export class Core{
    device;
    adapter;
    gpu;
    async Init(){
        if (!navigator.gpu) {
            throw new Error("WebGPU not supported on this browser.");
        }
        this.adapter = await navigator.gpu.requestAdapter();
        if(!this.adapter){
            throw new Error("No appropiate gpu adapter found.");
        }
        this.device = await this.adapter.requestDevice();
        if (!this.device) {
            throw new Error("No appropiate device.");
        }
    }
    SetGpu(){
        this.gpu = navigator.gpu;
        return this.gpu;
    }
}