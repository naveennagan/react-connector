import React from "react";

const ReactConnectorStart = (props) => {

    const { connectorContext, startIdentifier } = props;

    const { connectId } = connectorContext;

    const newProps = {
        draggable: true
    }


    const onDragStart = (event) => {

        const dragX = event.pageX;

        const dragY = event.pageY;

        event.dataTransfer.setData(connectId, `${dragX},${dragY},${startIdentifier}`);

    }
    
    const styles = {
        "height": "fit-content",
        "cursor": "pointer",
        "display": "inline-block"
    }
    

    return <div className='connector-start' connector="true" draggable = "true" onDragStart={onDragStart} style={{...styles}}>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {newProps}, null );
                })
            }
    </div>
}

export default ReactConnectorStart;