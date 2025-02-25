import React from 'react';

import {CreateWebGPUCanvas} from "../Engine/Core";
import  {useEffect, useState} from "react";

function CanvasWidget() {
    const canvasElement = useState(null);

    useEffect(() => {
        CreateWebGPUCanvas(800, 800).then(canvas => {
            if(canvasElement.current){
                canvasElement.current.appendChild(canvas);
            }
        });
    }, []);

    return <div ref={canvasElement}></div>; // This will now show the actual canvas
}

export default CanvasWidget;