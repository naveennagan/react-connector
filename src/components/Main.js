import React from "react";
import ReactConnectorContext from "../lib/ReactConnectorContext";
import ReactConnectorEnd from "../lib/ReactConnectorEnd";
import ReactConnectorStart from "../lib/ReactConnectorStart";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

export const Main = () => {

    const connectorContext = ReactConnectorContext("connect-shapes");

    return <div className="main">

        <ReactConnectorStart connectorContext={connectorContext}>
            <Rectangle />
        </ReactConnectorStart>

        <ReactConnectorEnd connectorContext={connectorContext}>
            <Circle />
        </ReactConnectorEnd>

    </div>
}