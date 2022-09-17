import React from "react";

const ReactConnectorEnd = (props) => {

    const { connectorContext, endIdentifier } = props;

    const { connectId } = connectorContext;

    const newProps = {
        draggable: true
    }


    const angle = (cx, cy, ex, ey) => {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    const drawLine = (x1,y1, x2,y2) => {

        console.log("Drawing line between ", x1, y1, " to ", x2, y2);

        var div = document.createElement('div');

        div.style.height = "2px";
        
        const x = Math.abs(x1-x2);

        const y = Math.abs(y1-y2);

        const width = Math.sqrt(x*x+y*y);

        div.style.width = width+"px";

        const rotateAngle = angle(x2,y2,x1,y1);

        div.style.backgroundColor = "black";

        div.style.position = "fixed";

        div.style.left = x2+"px";

        div.style.top = y2+"px";
        
        div.style.transform = `rotate(${rotateAngle}deg)`;

        div.style.transformOrigin = 'left';

        var connectorArrowTip = document.createElement('div');

        connectorArrowTip.style.width = "0px";

        connectorArrowTip.style.height = "0px";

        connectorArrowTip.style.borderTop = "10px solid transparent";

        connectorArrowTip.style.borderBottom = "10px solid transparent";

        connectorArrowTip.style.borderRight = "10px solid blue";

        connectorArrowTip.style.position = "absolute";

        connectorArrowTip.style.bottom = "-10px";

        connectorArrowTip.style.left = "-10px";
        
        div.appendChild(connectorArrowTip);
        
        document.body.appendChild(div);
    }

    const onDrop = (event) => {
        
        const targetX = event.pageX;

        const targetY = event.pageY;

        const sourceCooridnatesStringTokens =  event.dataTransfer.getData(connectId).split(",");

        const sourceX = sourceCooridnatesStringTokens[0];

        const sourceY = sourceCooridnatesStringTokens[1];

        let connectionObj = {
            endIdentifier,
            startIdentifier: sourceCooridnatesStringTokens[2],
            sourceX,
            sourceY,
            targetX,
            targetY
        }

        connectorContext.connectors.push(connectionObj);


        drawLine(sourceX,sourceY,targetX,targetY);

    };

    const onDragOver = (event) => {
        event.preventDefault();
    };
    
    const styles = {
        "height": "fit-content",
        "cursor": "pointer",
        "display": "inline-block"
    }
    

    return <div className='connector-end' connector="true" onDrop={onDrop} onDragOver={onDragOver} style={{...styles}}>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {newProps}, null );
                })
            }
    </div>
}

export default ReactConnectorEnd;